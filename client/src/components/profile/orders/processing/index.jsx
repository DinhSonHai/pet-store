import { useState, useEffect, Fragment } from 'react';
import { Button, Col, Row, Card, Progress } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { Loader } from '../../../../components';
import dayjs from 'dayjs';
import { getProcessingOrders } from '../../../../redux/actions/order';
import { connect } from 'react-redux';
import './styles.scss';
export const OrderProcessing = ({
  tabChange,
  setView,
  setId,
  setOrder,
  getProcessingOrders,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [processingOrders, setProcessingOrders] = useState([]);
  const [updateState, setUpdateState] = useState(false);
  useEffect(() => {
    let flag = true;
    async function getData() {
      setIsLoading(true);
      const res = await getProcessingOrders();
      if (flag) {
        setProcessingOrders(res);
      }
      setIsLoading(false);
    }
    if (tabChange === 'processing') {
      getData();
    }
    return () => (flag = false);
  }, [tabChange, updateState, getProcessingOrders]);
  return (
    <Fragment>
      {isLoading ? (
        <Loader className={'order-processing-loader'} />
      ) : (
        <Fragment>
          <div style={{ marginBottom: '1rem', textAlign: 'right' }}>
            <Button
              icon={<SyncOutlined />}
              onClick={() => setUpdateState(!updateState)}
            >
              Cập nhật
            </Button>
          </div>
          {processingOrders.map((p) => (
            <Card key={p._id} className='order-processing'>
              <div className='order-processing__head'>
                <Row gutter={[16, 16]}>
                  <Col
                    style={{ wordBreak: 'break-word' }}
                    xs={24}
                    sm={12}
                    md={8}
                    lg={6}
                  >
                    <p className='order-processing__title'>Mã đơn hàng</p>
                    <p className='order-processing__desc'>{p._id}</p>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <p className='order-processing__title'>Ngày mua</p>
                    <p className='order-processing__desc'>
                      {dayjs(p.createdAt).format('HH:mm DD/MM/YYYY')}
                    </p>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <p className='order-processing__title'>Tổng tiền</p>
                    <p className='order-processing__desc'>
                      {parseInt(p.totalMoney).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </p>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <p className='order-processing__title'>Số lượng</p>
                    <p className='order-processing__desc'>{`${p.amount} sản phẩm`}</p>
                  </Col>
                </Row>
              </div>
              <div className='order-processing__content'>
                <p className='order-processing__title'>Trạng thái</p>
                <Progress
                  percent={
                    p.status === 0
                      ? 5
                      : p.status === 1
                      ? 20
                      : p.status === 2
                      ? 40
                      : p.status === 3
                      ? 60
                      : p.status === 4 && 80
                  }
                  showInfo={false}
                />
                <p className='order-processing__status'>
                  {p.status === 0
                    ? 'Đặt hàng thành công'
                    : p.status === 1
                    ? 'Đã xác nhận đơn hàng'
                    : p.status === 2
                    ? 'Đang lấy hàng'
                    : p.status === 3
                    ? 'Đóng gói xong'
                    : p.status === 4 && 'Đang vận chuyển'}
                </p>
              </div>
              <div className='order-processing__actions'>
                <Button
                  onClick={() => {
                    setId(p._id);
                    setOrder(p);
                    setView('detail');
                  }}
                  style={{ marginRight: '1rem' }}
                  type='primary'
                >
                  Xem chi tiết
                </Button>
                <Button
                  onClick={() => {
                    setId(p._id);
                    setView('track');
                  }}
                  type='primary'
                >
                  Theo dõi đơn hàng
                </Button>
              </div>
            </Card>
          ))}
        </Fragment>
      )}
    </Fragment>
  );
};
export default connect(null, { getProcessingOrders })(OrderProcessing);
