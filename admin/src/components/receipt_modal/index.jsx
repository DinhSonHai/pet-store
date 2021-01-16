import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  Table,
  Input,
  Button,
  Popconfirm,
  Form,
  Modal,
  InputNumber,
} from 'antd';
import { connect } from 'react-redux';
import {
  createReceipt,
  getAllReceiptsDetails,
} from '../../redux/actions/receipts';
import dayjs from 'dayjs';
import './styles.scss';
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
const ReceiptModal = ({
  setVisible,
  data,
  auth: { user },
  createReceipt,
  receiptId,
  item,
  setView,
  getAllReceiptsDetails,
  receipts: { receipts_detail },
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState(data);
  const [note, setNote] = useState('');
  const columns_details = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
    },
    {
      title: 'Số lượng nhập',
      dataIndex: 'quantity',
      render: (value) => (
        <span
          style={{
            color: value >= 0 ? 'var( --success-color)' : 'var(--danger-color)',
          }}
        >
          {value}
        </span>
      ),
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
  ];
  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
    },
    {
      title: 'Số lượng hiện tại',
      dataIndex: 'quantity',
    },
    {
      title: 'Số lượng nhập',
      dataIndex: 'quantityImport',
      editable: true,
      render: (value) => (
        <span
          style={{
            color: value >= 0 ? 'var( --success-color)' : 'var(--danger-color)',
          }}
        >
          {value}
        </span>
      ),
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      editable: true,
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
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await getAllReceiptsDetails(receiptId);
      setIsLoading(false);
    }
    if (receiptId) {
      getData();
    }
  }, [receiptId, getAllReceiptsDetails]);
  const handleCancel = () => {
    setVisible(false);
  };
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
  const onChange = (e) => {
    setNote(e.target.value);
  };
  const onFinish = async () => {
    setConfirmLoading(true);
    await createReceipt(dataSource, note);
    setConfirmLoading(false);
    setVisible(false);
  };
  return (
    <Modal
      width={1200}
      onCancel={() => {
        if (setView) {
          setView(false);
        }
        if (setVisible) {
          setVisible(false);
        }
      }}
      footer={false}
      confirmLoading={confirmLoading}
      visible={true}
      centered
      maskClosable={false}
      title='Thông tin phiếu nhập'
    >
      <div className='receipt'>
        <p className='receipt__name'>
          {' '}
          <span>Người nhập phiếu: </span>{' '}
          {receiptId ? item.employeeId.name : user.name}
        </p>
        <p className='receipt__role'>
          {' '}
          <span>Vai trò: </span>{' '}
          {receiptId
            ? item.employeeId.role === 0
              ? 'Quản trị'
              : 'Nhân viên'
            : user.role === 0
            ? 'Quản trị'
            : 'Nhân viên'}
        </p>
        <p className='receipt__amount'>
          {' '}
          <span>Số lượng sản phẩm: </span>{' '}
          {receiptId ? receipts_detail.length : data.length}
        </p>
        <p className='receipt__date'>
          {' '}
          <span>Ngày nhập: </span>{' '}
          {receiptId
            ? `${dayjs(item.createdAt).format('DD/MM/YYYY')}`
            : `${dayjs().format('DD/MM/YYYY')}`}
        </p>
        <p className='receipt__note'>
          <span>Note: </span>
        </p>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <Input.TextArea
          defaultValue={receiptId ? item.note : ''}
          rows={4}
          onChange={onChange}
        />
      </div>
      <Table
        loading={isLoading}
        scroll={{ y: 250 }}
        components={receiptId ? null : components}
        rowClassName={() => (receiptId ? '' : 'editable-row')}
        dataSource={receiptId ? receipts_detail : dataSource}
        columns={receiptId ? columns_details : _columns}
      />
      {receiptId ? (
        <div style={{ textAlign: 'right', marginTop: '1rem' }}>
          <Button
            onClick={() => {
              setView(false);
            }}
          >
            Đóng
          </Button>
        </div>
      ) : (
        <div style={{ textAlign: 'right', marginTop: '1rem' }}>
          <Button
            style={{ marginRight: '1rem' }}
            disabled={confirmLoading}
            onClick={handleCancel}
          >
            Hủy
          </Button>
          <Button type='primary' onClick={onFinish} loading={confirmLoading}>
            {'Thêm'}
          </Button>
        </div>
      )}
    </Modal>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  receipts: state.receipts,
});
export default connect(mapStateToProps, {
  createReceipt,
  getAllReceiptsDetails,
})(ReceiptModal);
