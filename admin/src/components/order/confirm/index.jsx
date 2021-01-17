import { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  getOrdersByStatus,
  updateOrderStatus,
} from '../../../redux/actions/orders';
import { ViewOrder } from '../../../components';
import dayjs from 'dayjs';
import { Button, Table, Tooltip } from 'antd';
import {
  CheckCircleOutlined,
  EyeOutlined,
  SyncOutlined,
} from '@ant-design/icons';
const ConfirmOrders = ({
  tabChange,
  orders: { comfirmOrders },
  getOrdersByStatus,
  updateOrderStatus,
}) => {
  const [updateState, setUpdateState] = useState(false);
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
          {value === 0 && 'Đặt hàng thành công'}
        </span>
      ),
    },
    {
      title: 'Hành động',
      dataIndex: 'operation',
      render: (_, record) => {
        return (
          <Fragment>
            <Button
              onClick={() => handleViewOrder(record)}
              type='link'
              icon={<EyeOutlined />}
            />
            |
            <Button
              onClick={() => handleUpdateOrder(record._id)}
              type='link'
              icon={<CheckCircleOutlined />}
            />
          </Fragment>
        );
      },
    },
  ];
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await getOrdersByStatus(0);
      setIsLoading(false);
    }
    if (tabChange === 'confirm') {
      getData();
    }
  }, [tabChange, getOrdersByStatus, updateState]);
  const handleViewOrder = (record) => {
    setId(record._id);
    setItem(record);
    setView(true);
  };
  const handleUpdateOrder = async (id) => {
    if (id) {
      setIsLoading(true);
      await updateOrderStatus(id, 0);
      setIsLoading(false);
    }
  };
  return (
    <Fragment>
      {view && <ViewOrder id={id} order={item} setView={setView} />}
      <div style={{ marginBottom: '1rem', textAlign: 'right' }}>
        <Button
          icon={<SyncOutlined />}
          onClick={() => setUpdateState(!updateState)}
          disabled={isLoading}
        >
          Cập nhật
        </Button>
      </div>
      <Table
        columns={columns}
        loading={isLoading}
        dataSource={comfirmOrders}
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
})(ConfirmOrders);
