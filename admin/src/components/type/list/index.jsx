import { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Table, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import {
  getAllTypes,
  editType,
  removeType,
  createType,
} from '../../../redux/actions/types';
import { TypeAddForm } from '../../../components';
const TypeList = ({
  types: { types },
  getAllTypes,
  editType,
  removeType,
  createType,
  tabChange,
}) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [item, setItem] = useState(null);
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await getAllTypes();
      setIsLoading(false);
    }
    if (tabChange === 'list') {
      getData();
    }
  }, [getAllTypes, tabChange]);
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
                setEdit(true);
                setItem(record);
                setVisible(true);
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
      <Button
        style={{ fontSize: '1rem', marginBottom: '1rem' }}
        icon={<PlusOutlined />}
        type='link'
        onClick={() => {
          setEdit(false);
          setVisible(true);
        }}
      >
        Thêm
      </Button>
      <TypeAddForm
        edit={edit}
        item={item}
        createType={createType}
        editType={editType}
        setVisible={setVisible}
        visible={visible}
      />
      <Form form={form} component={false}>
        <Table
          columns={columns}
          loading={isLoading}
          dataSource={types}
          pagination={{
            responsive: true,
            showSizeChanger: false,
          }}
        />
      </Form>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  types: state.types,
});
export default connect(mapStateToProps, {
  getAllTypes,
  editType,
  removeType,
  createType,
})(TypeList);
