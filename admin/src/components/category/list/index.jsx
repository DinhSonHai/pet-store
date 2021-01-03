import { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Table, Input, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import {
  getAllCategories,
  editCategory,
  removeCategory,
  createCategory,
} from '../../../redux/actions/categories';
import { CategoryAddForm } from '../../../components';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Vui lòng nhập ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const CategoryList = ({
  categories: { categories },
  getAllCategories,
  editCategory,
  removeCategory,
  createCategory,
  tabChange,
}) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const isEditing = (record) => record.key === editingKey;
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await getAllCategories();
      setIsLoading(false);
    }
    if (tabChange === 'list') {
      getData();
    }
  }, [getAllCategories, tabChange]);
  const remove = async (id) => {
    setIsLoading(true);
    await removeCategory(id);
    setIsLoading(false);
  };
  const edit = (record) => {
    form.setFieldsValue({
      categoryName: '',
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async (key) => {
    const row = await form.validateFields();
    setIsLoading(true);
    await editCategory({ ...row, id: key });
    setIsLoading(false);
    setEditingKey('');
  };
  const columns = [
    {
      title: 'Tên danh mục',
      dataIndex: 'categoryName',
      editable: true,
    },
    {
      title: 'Hành động',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              style={{
                marginRight: 8,
              }}
              onClick={() => save(record.key)}
              type='link'
            >
              Lưu
            </Button>
            <Popconfirm title='Sure to cancel?' onConfirm={cancel}>
              <Button type='link'>Hủy</Button>
            </Popconfirm>
          </span>
        ) : (
          <Fragment>
            <Button
              type='link'
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
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
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Fragment>
      <Button
        style={{ fontSize: '1rem', marginBottom: '1rem' }}
        icon={<PlusOutlined />}
        type='link'
        onClick={() => setVisible(true)}
      >
        Thêm
      </Button>
      <CategoryAddForm
        createCategory={createCategory}
        setVisible={setVisible}
        visible={visible}
      />
      <Form form={form} component={false}>
        <Table
          loading={isLoading}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          dataSource={categories}
          columns={mergedColumns}
          rowClassName='editable-row'
          pagination={{
            onChange: cancel,
            responsive: true,
            showSizeChanger: false,
          }}
        />
      </Form>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  categories: state.categories,
});
export default connect(mapStateToProps, {
  getAllCategories,
  editCategory,
  removeCategory,
  createCategory,
})(CategoryList);
