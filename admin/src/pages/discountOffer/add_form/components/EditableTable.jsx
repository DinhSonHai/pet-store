import React from 'react';
import { Table, Popconfirm, Tooltip } from 'antd';

import EditableRow from './EditableRow';
import EditableCell from './EditableCell';
import '../../styles.scss';

const EditableTable = ({ dataSource, setDataSource }) => {

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = [
    {
      align: 'center',
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      width: "30%",
      ellipsis: true,
      render: value => (
        <Tooltip placement="topLeft" title={value}>
          {value}
        </Tooltip>
      ),
    },
    {
      align: 'center',
      title: 'Giá sản phẩm',
      dataIndex: 'price',
      render: (value) => <>{value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</>
    },
    {
      align: 'center',
      title: 'Phần trăm giảm',
      dataIndex: 'discount',
      editable: true,
      render: (value) => <>{value ? `- ${value} %` : ''}</>
    },
    {
      align: 'center',
      title: 'Giá giảm',
      dataIndex: 'discountPrice',
      render: (_, record) => {
        const discountPrice = record.price * (100 - record.discount) / 100;
        return discountPrice ? discountPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : ''
      }
    },
    {
      align: 'center',
      title: '',
      dataIndex: '',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Bạn có muốn xóa?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
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
  };
  
  const handleSave = (row) => {
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
