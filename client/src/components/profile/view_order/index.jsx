import { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Button, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import {
  getOrderDetailById,
  cancelOrderById,
} from '../../../redux/actions/order';
import { FastBackwardOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import './styles.scss';

const ViewOrder = ({
  id,
  order,
  setView,
  setId,
  getOrderDetailById,
  cancelOrderById,
}) => {
  const [orderDetail, setOrderDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'productName',
      width: '65%',
      render: (value, record) => (
        <Link to={`/pet/${record.productId}`}>{value}</Link>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'amount',
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
  useEffect(() => {
    let flag = true;
    async function getData() {
      setIsLoading(true);
      const res = await getOrderDetailById(id);
      if (flag) {
        setOrderDetail(res);
      }
      setIsLoading(false);
    }
    if (id) {
      getData();
    }
    return () => (flag = false);
  }, [id, getOrderDetailById]);
  const showPopconfirm = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    const res = await cancelOrderById(id);
    setConfirmLoading(false);
    setVisible(false);
    if (res) {
      setView('default');
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <section className='view-order'>
      <p className='view-order__id'>
        {' '}
        <span>Chi tiết đơn hàng: </span> {`#${id}`}
      </p>
      <p className='view-order__status'>
        <span>Trạng thái: </span>
        {order.status === 0
          ? ' Đặt hàng thành công'
          : order.status === 1
          ? ' Đã xác nhận đơn hàng'
          : order.status === 2
          ? ' Đang lấy hàng'
          : order.status === 3
          ? ' Đóng gói xong'
          : order.status === 4
          ? ' Đang vận chuyển'
          : order.status === 5
          ? ' Giao hàng thành công'
          : order.status === -1 && 'Đã hủy'}
      </p>
      <p className='view-order__date'>
        <span>Ngày đặt: </span>
        {dayjs(order.createdAt).format('HH:mm DD/MM/YYYY')}
      </p>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '1rem',
          justifyContent: 'flex-end',
        }}
      >
        {order.status < 2 && order.status !== -1 && (
          <Popconfirm
            title='Hủy đơn hàng?'
            visible={visible}
            onConfirm={handleOk}
            okButtonProps={{ loading: confirmLoading }}
            cancelButtonProps={{ disabled: confirmLoading }}
            onCancel={handleCancel}
          >
            <Button onClick={showPopconfirm} danger>
              Hủy đơn hàng
            </Button>
          </Popconfirm>
        )}
        {order.status !== -1 && (
          <Button
            style={{ marginLeft: '1rem' }}
            onClick={() => {
              setId(order._id);
              setView('track');
            }}
            type='primary'
          >
            Theo dõi đơn hàng
          </Button>
        )}
      </div>
      <Row gutter={[16, 16]}>
        <Col style={{ wordBreak: 'break-word' }} xs={24} sm={12} md={8} lg={8}>
          <Card style={{ height: '100%' }} title='Địa chỉ người nhận'>
            <p className='view-order__name'>{order.name}</p>
            <p className='view-order__address'>{order.address}</p>
            <p className='view-order__phone'>{'SĐT: ' + order.phone}</p>
          </Card>
        </Col>
        <Col style={{ wordBreak: 'break-word' }} xs={24} sm={12} md={8} lg={8}>
          <Card style={{ height: '100%' }} title='Hình thức giao hàng'>
            <p className='view-order__delivery'>
              {order.deliveryState === 0
                ? 'Giao hàng tiêu chuẩn'
                : 'Giao hàng nhanh'}
            </p>
            <p className='view-order__delivery--fee'>{`Phí giao hàng: ${parseInt(
              order.deliveryState === 0 ? 35000 : 55000
            ).toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })}`}</p>
          </Card>
        </Col>
        <Col style={{ wordBreak: 'break-word' }} xs={24} sm={12} md={8} lg={8}>
          <Card style={{ height: '100%' }} title='Hình thức thanh toán'>
            <p className='view-order__payment'>
              {order.paymentState === 0 && 'Thanh toán tiền mặt khi nhận hàng'}
            </p>
          </Card>
        </Col>
      </Row>
      <p className='view-order__total'>
        <span>Tổng tiền: </span>{' '}
        {parseInt(order.totalMoney).toLocaleString('vi-VN', {
          style: 'currency',
          currency: 'VND',
        })}
      </p>
      <Table
        loading={isLoading}
        scroll={{ y: 250 }}
        columns={columns}
        dataSource={orderDetail}
        pagination={{
          responsive: true,
          showSizeChanger: false,
        }}
      />
      <Button
        icon={<FastBackwardOutlined />}
        type='link'
        onClick={() => {
          setView('default');
        }}
      >
        Quay lại hóa đơn của tôi
      </Button>
    </section>
  );
};
export default connect(null, { getOrderDetailById, cancelOrderById })(
  ViewOrder
);
