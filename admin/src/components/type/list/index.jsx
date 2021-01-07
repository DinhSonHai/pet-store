import { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { TypeAddForm } from '../../../components';
import { Button, Table, Popconfirm } from 'antd';

import { getAllTypes, removeType } from '../../../redux/actions/types';

const TypeList = ({ types: { types }, getAllTypes, removeType, tabChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [item, setItem] = useState(null);
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await getAllTypes();
      setIsLoading(false);
    }
    if (tabChange === 'list' && !edit) {
      getData();
    }
  }, [getAllTypes, tabChange, edit]);
  const remove = async (id) => {
    setIsLoading(true);
    await removeType(id);
    setIsLoading(false);
  };
  const columns = [
    {
      title: 'Tên loại SP',
      dataIndex: 'typeName',
    },
    {
      title: 'Thuộc danh mục',
      dataIndex: ['categoryId', 'categoryName'],
    },
    {
      title: 'Hành động',
      dataIndex: 'operation',
      render: (_, record) => {
        return (
          <Fragment>
            <Button
              type='link'
              onClick={() => {
                setItem(record);
                setEdit(true);
              }}
            >
              Sửa
            </Button>
            <Popconfirm
              title='Sure to remove?'
              onConfirm={() => remove(record.key)}
            >
              <Button danger type='link'>
                Ẩn
              </Button>
            </Popconfirm>
          </Fragment>
        );
      },
    },
  ];
  return (
    <Fragment>
      {!edit ? (
        <Fragment>
          <Table
            columns={columns}
            loading={isLoading}
            dataSource={types}
            pagination={{
              responsive: true,
              showSizeChanger: false,
            }}
          />
        </Fragment>
      ) : (
        <TypeAddForm edit={edit} setEdit={setEdit} item={item} />
      )}
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  types: state.types,
});
export default connect(mapStateToProps, {
  getAllTypes,
  removeType,
})(TypeList);
