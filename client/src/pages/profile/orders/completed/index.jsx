import { useState, useEffect } from 'react';
import { Table, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { getCompletedOrders } from '../../../../redux/actions/order';
import { connect } from 'react-redux';
export const OrderCompleted = ({
  tabChange,
  setId,
  setOrder,
  setView,
  getCompletedOrders,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [completedOrders, setCompletedOrders] = useState([]);
  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: '_id',
      ellipsis: {
        showTitle: false,
      },
      render: (value, record) => (
        <Tooltip placement='topLeft' title={value}>
          <span
            onClick={() => {
              setId(value);
              setOrder(record);
              setView('detail');
            }}
            style={{ color: 'var(--mainstream-color)', cursor: 'pointer' }}
          >
            {value}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Ngày mua',
      dataIndex: 'createdAt',
      render: (value) => <span>{dayjs(value).format('HH:mm DD/MM/YYYY')}</span>,
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
      const res = await getCompletedOrders();
      if (flag) {
        setCompletedOrders(res);
      }
      setIsLoading(false);
    }
    if (tabChange === 'completed') {
      getData();
    }
    return () => (flag = false);
  }, [tabChange, getCompletedOrders]);
  return (
    <Table
      columns={columns}
      loading={isLoading}
      dataSource={completedOrders}
      pagination={{
        responsive: true,
        showSizeChanger: false,
      }}
    />
  );
};
export default connect(null, { getCompletedOrders })(OrderCompleted);
