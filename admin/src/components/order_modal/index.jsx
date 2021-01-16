import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  Table,
  Button,
  Popconfirm,
  Form,
  Modal,
  InputNumber,
  Input,
} from 'antd';
import { connect } from 'react-redux';
import { adminOrder } from '../../redux/actions/orders';
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className='editable-cell-value-wrap'
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
const OrderModal = ({ data, setView, adminOrder }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [dataSource, setDataSource] = useState(data);
  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      render: (value) => (
        <span>
          {parseInt(value).toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          })}
        </span>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'amount',
      editable: true,
    },
    {
      title: 'Hành động',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title='Sure to delete?'
            onConfirm={() => handleDelete(record.key)}
          >
            <Button type='link'>Xóa</Button>
          </Popconfirm>
        ) : null,
    },
  ];
  const handleDelete = (key) => {
    const dataSourceClone = [...dataSource];
    setDataSource(dataSourceClone.filter((item) => item.key !== key));
  };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const _columns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });
  const onFinish = async (values) => {
    setConfirmLoading(true);
    const res = await adminOrder({ ...values, cart: dataSource });
    setConfirmLoading(false);
    if (res) {
      setView(false);
    }
  };
  return (
    <Modal
      width={1200}
      onCancel={() => {
        if (setView) {
          setView(false);
        }
      }}
      centered
      footer={false}
      visible={true}
      maskClosable={false}
      title='Thông tin đơn hàng'
    >
      <Form size='large' layout='vertical' onFinish={onFinish}>
        <Form.Item
          label='Họ tên'
          name='name'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập họ tên!',
            },
          ]}
        >
          <Input placeholder='Họ tên' />
        </Form.Item>
        <Form.Item
          name='phone'
          label='Số điện thoại'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập số điện thoại!',
            },
          ]}
        >
          <Input placeholder='Số điện thoại' />
        </Form.Item>
        <Form.Item
          name='email'
          label='E-mail'
          rules={[
            {
              type: 'email',
              message: 'Email không hợp lệ',
            },
            {
              required: true,
              message: 'Vui lòng nhập email!',
            },
          ]}
        >
          <Input placeholder='Email' />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập địa chỉ!',
            },
          ]}
          name='address'
          label='Địa chỉ'
        >
          <Input.TextArea placeholder='Địa chỉ' />
        </Form.Item>
        <Form.Item name='note' label='Ghi chú'>
          <Input.TextArea placeholder='Ghi chú' />
        </Form.Item>
        <Form.Item style={{ textAlign: 'right' }}>
          <Button
            style={{ marginRight: '1rem' }}
            disabled={confirmLoading}
            onClick={() => setView(false)}
          >
            Hủy
          </Button>
          <Button type='primary' htmlType='submit' loading={confirmLoading}>
            {'Thêm'}
          </Button>
        </Form.Item>
      </Form>
      <Table
        scroll={{ y: 250 }}
        components={components}
        rowClassName={() => 'editable-row'}
        dataSource={dataSource}
        columns={_columns}
      />
    </Modal>
  );
};
export default connect(null, { adminOrder })(OrderModal);
