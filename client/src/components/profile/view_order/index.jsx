import { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Button } from 'antd';
import { FastBackwardOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import api from '../../../api';
import './styles.scss';

const ViewOrder = ({ id, order, setViewDetail }) => {
  const [orderDetail, setOrderDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'productName',
      render: (value, record) => <Link to={record._id}>{value}</Link>,
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
      const res = await api.get(`/auth/orders_detail/${id}`);
      if (flag) {
        setOrderDetail(res.data);
      }
      setIsLoading(false);
    }
    if (id) {
      getData();
    }
    return () => (flag = false);
  }, [id]);
  console.log(id);
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
          : order.status === 5 && ' Giao hàng thành công'}
      </p>
      <p className='view-order__date'>
        <span>Ngày đặt: </span>
        {dayjs(order.createdAt).format('HH:mm DD/MM/YYYY')}
      </p>
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
          setViewDetail(false);
        }}
      >
        Quay lại hóa đơn của tôi
      </Button>
    </section>
  );
};
export default ViewOrder;
