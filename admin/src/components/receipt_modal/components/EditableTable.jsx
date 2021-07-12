import React from 'react';
import { Table, Popconfirm, Tooltip, Button } from 'antd';

import EditableRow from './EditableRow';
import EditableCell from './EditableCell';
// import '../../styles.scss';

const EditableTable = ({ dataSource, setDataSource, setAmount }) => {
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

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
      title: 'Hành động',
      dataIndex: 'operation',
      render: (_, record) =>
        (
          <Popconfirm
            title='Sure to delete?'
            onConfirm={() => handleDelete(record.key)}
          >
            <Button type='link'>Xóa</Button>
          </Popconfirm>
        ),
    },
  ];

  const editableColumns = columns.map((col) => {
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

  const handleDelete = (key) => {
    const baseData = [...dataSource];
    const newData = baseData.filter((item) => item._id !== key);
    setDataSource(newData);
    setAmount(newData.length);
  };
  
  const handleSave = (row) => {
    if (row.discount < 1 || row.discount > 99) {
      return;
    }
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
  };

  return (
    <Table
      components={components}
      rowClassName={() => 'editable-row'}
      bordered
      dataSource={dataSource}
      columns={editableColumns}
    />
  );
}

export default EditableTable;
