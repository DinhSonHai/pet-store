import { useState, useEffect } from 'react';
import { Table, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { getCaneledOrders } from '../../../../redux/actions/order';
import { connect } from 'react-redux';
export const OrderCanceled = ({
  tabChange,
  setId,
  setOrder,
  setView,
  getCaneledOrders,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [canceledOrders, setCanceledOrders] = useState([]);
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
      render: (value) => `${value === -1 && `Đã hủy`}`,
    },
  ];
  useEffect(() => {
    let flag = true;
    async function getData() {
      setIsLoading(true);
      const res = await getCaneledOrders();
      if (flag) {
        setCanceledOrders(res);
      }
      setIsLoading(false);
    }
    if (tabChange === 'canceled') {
      getData();
    }
    return () => (flag = false);
  }, [tabChange, getCaneledOrders]);
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
export default connect(null, { getCaneledOrders })(OrderCanceled);
