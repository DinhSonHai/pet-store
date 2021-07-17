import { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import TypeAddForm from '../add_form';
import { Button, Table, Popconfirm, Space} from 'antd';

import { getAllTypes, removeType } from '../../../redux/actions/types';
import useCheckRole from '../../../hooks/useCheckRole';
import { ADMIN } from '../../../constants';

const TypeList = ({ types: { types }, getAllTypes, removeType, tabChange, setTabChange }) => {
  const { role } = useCheckRole();

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
          <Space>
            <Button
              type='primary'
              onClick={() => {
                setItem(record);
                setEdit(true);
              }}
            >
              Sửa
            </Button>
            <Popconfirm
              title='Bạn có muốn ẩn?'
              onConfirm={() => remove(record.key)}
            >
              <Button danger type='primary'>
                Ẩn
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  if (role !== ADMIN) {
    columns.splice(-1, 1);
  }

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
        <TypeAddForm edit={edit} setEdit={setEdit} item={item} tabChange={tabChange} setTabChange={setTabChange}/>
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
