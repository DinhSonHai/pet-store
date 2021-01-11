import { useState, useEffect } from 'react';
import { Table, Button, Tooltip } from 'antd';
import dayjs from 'dayjs';
import api from '../../../../api';
export const OrderCanceled = ({ tabChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [canceledOrders, setCanceledOrders] = useState([]);
  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: '_id',
      ellipsis: {
        showTitle: false,
      },
      render: (value) => (
        <Tooltip placement='topLeft' title={value}>
          {value}
        </Tooltip>
      ),
    },
    {
      title: 'Ngày mua',
      dataIndex: 'createdAt',
      render: (value) => <span>{dayjs(value).format('DD/MM/YYYY')}</span>,
    },
    {
      title: 'Số lượng',
      dataIndex: 'amount',
      render: (value) => `${value} sản phẩm`,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalMoney',
      render: (value) =>
        `${parseInt(value).toLocaleString('vi-VN', {
          style: 'currency',
          currency: 'VND',
        })}`,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (value) => `${value === 5 && `Giao hàng thành công`}`,
    },
  ];
  useEffect(() => {
    let flag = true;
    async function getData() {
      setIsLoading(true);
      const res = await api.get('/auth/orders_canceled');
      if (flag) {
        setCanceledOrders(res.data);
      }
      setIsLoading(false);
    }
    if (tabChange === 'canceled') {
      getData();
    }
    return () => (flag = false);
  }, [tabChange]);
  return (
    <Table
      columns={columns}
      loading={isLoading}
      dataSource={canceledOrders}
      pagination={{
        responsive: true,
        showSizeChanger: false,
      }}
    />
  );
};
export default OrderCanceled;
