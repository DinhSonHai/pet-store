import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Col, Row, Card, Popconfirm, Input } from 'antd';
import { connect } from 'react-redux';
import { getOrdersDetail, cancelOrder } from '../../../redux/actions/orders';
import dayjs from 'dayjs';
import './styles.scss';
export const ViewOrder = ({
  order,
  setView,
  id,
  getOrdersDetail,
  cancelOrder,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [detailOrders, setDetailOrders] = useState([]);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      width: '65%',
    },
    {
      title: 'Số lượng',
      dataIndex: 'amount',
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
  ];
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const res = await getOrdersDetail(id);
      if (res) {
        setDetailOrders(res);
      }
      setIsLoading(false);
    }
    if (id) {
      getData();
    }
  }, [id, getOrdersDetail]);
  const showPopconfirm = () => {
    setVisible(true);
  };
  const handleOk = async () => {
    setConfirmLoading(true);
    const res = await cancelOrder(
      id,
      order.status === 0 ? 0 : order.status === 1 && 1
    );
    setConfirmLoading(false);
    setVisible(false);
    if (res) {
      setView(false);
    }
  };
  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <Modal
      centered
      width={1200}
      onCancel={() => {
        setView(false);
      }}
      footer={false}
      visible={true}
      maskClosable={false}
      title='Thông tin đơn hàng'
    >
      <section className='view-order'>
        <p className='view-order__id'>
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
        </div>
        <Row gutter={[16, 16]}>
          <Col
            style={{ wordBreak: 'break-word' }}
            xs={24}
            sm={12}
            md={8}
            lg={8}
          >
            <Card style={{ height: '100%' }} title='Địa chỉ người nhận'>
              <p className='view-order__name'>{order.name}</p>
              <p className='view-order__address'>{order.address}</p>
              <p className='view-order__phone'>{'SĐT: ' + order.phone}</p>
            </Card>
          </Col>
          <Col
            style={{ wordBreak: 'break-word' }}
            xs={24}
            sm={12}
            md={8}
            lg={8}
          >
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
          <Col
            style={{ wordBreak: 'break-word' }}
            xs={24}
            sm={12}
            md={8}
            lg={8}
          >
            <Card style={{ height: '100%' }} title='Hình thức thanh toán'>
              <p className='view-order__payment'>
                {order.paymentState === 0 &&
                  'Thanh toán tiền mặt khi nhận hàng'}
              </p>
            </Card>
          </Col>
        </Row>
        <div style={{ marginBottom: '1rem' }}>
          <label>Ghi chú:</label>
          <Input.TextArea defaultValue={order.note || ''} rows={4} />
        </div>
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
          dataSource={detailOrders}
          pagination={{
            responsive: true,
            showSizeChanger: false,
          }}
        />
        <Button
          onClick={() => {
            setView(false);
          }}
        >
          Quay lại
        </Button>
      </section>
    </Modal>
  );
};

export default connect(null, {
  getOrdersDetail,
  cancelOrder,
})(ViewOrder);
