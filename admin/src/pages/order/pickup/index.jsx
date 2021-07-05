import { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  getOrdersByStatus,
  updateOrderStatus,
} from '../../../redux/actions/orders';
import ViewOrder from '../view';
import dayjs from 'dayjs';
import { Button, Table, Tooltip, Space } from 'antd';
import { CheckCircleOutlined, EyeOutlined } from '@ant-design/icons';
const PickUpOrders = ({
  tabChange,
  orders: { pickUpOrders },
  getOrdersByStatus,
  updateOrderStatus,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState(false);
  const [item, setItem] = useState(null);
  const [id, setId] = useState(null);
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
      title: 'Ngày đặt hàng',
      dataIndex: 'createdAt',
      render: (value) => <span>{dayjs(value).format('HH:mm DD/MM/YYYY')}</span>,
    },
    {
      title: 'Tên KH',
      dataIndex: 'name',
    },
    {
      title: 'Số ĐT',
      dataIndex: 'phone',
      render: (value) => <span style={{ fontWeight: 'bold' }}>{value}</span>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (value) => (
        <span style={{ color: 'var(--success-color)' }}>
          {value === 1 && 'Đã xác nhận'}
        </span>
      ),
    },
    {
      title: 'Hành động',
      dataIndex: 'operation',
      render: (_, record) => {
        return (
          <Space>
            <Button
              onClick={() => handleViewOrder(record)}
              icon={<EyeOutlined />}
            />
            <Button
              onClick={() => handleUpdateOrder(record._id)}
              icon={<CheckCircleOutlined />}
              type='primary'
            />
          </Space>
        );
      },
    },
  ];
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await getOrdersByStatus(1);
      setIsLoading(false);
    }
    if (tabChange === 'pickup') {
      getData();
    }
  }, [tabChange, getOrdersByStatus]);
  const handleViewOrder = (record) => {
    setId(record._id);
    setItem(record);
    setView(true);
  };
  const handleUpdateOrder = async (id) => {
    if (id) {
      setIsLoading(true);
      await updateOrderStatus(id, 1);
      setIsLoading(false);
    }
  };
  return (
    <Fragment>
      {view && <ViewOrder id={id} order={item} setView={setView} />}

      <Table
        columns={columns}
        loading={isLoading}
        dataSource={pickUpOrders}
        pagination={{
          responsive: true,
          showSizeChanger: false,
        }}
      />
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  orders: state.orders,
});
export default connect(mapStateToProps, {
  getOrdersByStatus,
  updateOrderStatus,
})(PickUpOrders);
