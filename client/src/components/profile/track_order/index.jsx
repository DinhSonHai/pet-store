import { useState, useEffect, Fragment } from 'react';
import { Button, Card, Steps, Timeline } from 'antd';
import { getOrderById } from '../../../redux/actions/order';
import { connect } from 'react-redux';
import { FastBackwardOutlined } from '@ant-design/icons';
import { SyncOutlined } from '@ant-design/icons';
import { Loader } from '../../../components';
import dayjs from 'dayjs';
import './styles.scss';

const { Step } = Steps;

const TrackOrder = ({ id, setView, setId, setOrder, getOrderById }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [updateState, setUpdateState] = useState(false);
  useEffect(() => {
    let flag = true;
    async function getData() {
      setIsLoading(true);
      const res = await getOrderById(id);
      if (flag) {
        setData(res);
      }
      setIsLoading(false);
    }
    if (id) {
      getData();
    }
    return () => (flag = false);
  }, [id, updateState, getOrderById]);

  return (
    <section className='track-order'>
      {isLoading || !data ? (
        <Loader className={'track-order-loader'} />
      ) : (
        <Fragment>
          <div className='trac-order__overall'>
            <p
              onClick={() => {
                setId(data._id);
                setOrder(data);
                setView('detail');
              }}
              className='track-order__title'
            >
              {`Theo dõi đơn hàng: #`}
              <span>{data._id}</span>
            </p>
            {data.status !== 5 && (
              <div style={{ marginBottom: '1rem', textAlign: 'right' }}>
                <Button
                  icon={<SyncOutlined />}
                  onClick={() => setUpdateState(!updateState)}
                >
                  Cập nhật
                </Button>
              </div>
            )}
            <Card
              style={{ marginBottom: '1rem' }}
              title={`Trạng thái: ${
                data.status === 0
                  ? ' Đặt hàng thành công'
                  : data.status === 1
                  ? ' Đã xác nhận đơn hàng'
                  : data.status === 2
                  ? ' Đang lấy hàng'
                  : data.status === 3
                  ? ' Đóng gói xong'
                  : data.status === 4
                  ? ' Đang vận chuyển'
                  : data.status === 5 && ' Giao hàng thành công'
              } | ${dayjs(
                data.status === 0
                  ? data.createdAt
                  : data.status === 1
                  ? data.confirmedAt
                  : data.status === 2
                  ? data.pickedUpAt
                  : data.status === 3
                  ? data.packedAt
                  : data.status === 4
                  ? data.transportedAt
                  : data.status === 5 && data.deliveriedAt
              ).format('HH:mm DD/MM/YYYY')}`}
            >
              <Steps progressDot responsive='true' current={data.status || 0}>
                <Step title='Đặt hàng thành công' />
                <Step title='Đã xác nhận đơn hàng' />
                <Step title='Đang lấy hàng' />
                <Step title='Đóng gói xong' />
                <Step title='Đang vận chuyển' />
                <Step title='Giao hàng thành công' />
              </Steps>
            </Card>
          </div>
          <div className='track-order__detail'>
            <Card
              title='Chi tiết trạng thái đơn hàng'
              style={{ marginBottom: '1rem' }}
            >
              <Timeline mode='left'>
                <Timeline.Item
                  label={dayjs(data.createdAt).format('HH:mm DD/MM/YYYY')}
                >
                  Đặt hàng thành công
                </Timeline.Item>
                {data.status >= 1 && (
                  <Timeline.Item
                    label={dayjs(data.confirmedAt).format('HH:mm DD/MM/YYYY')}
                  >
                    Đã xác nhận đơn hàng
                  </Timeline.Item>
                )}
                {data.status >= 2 && (
                  <Timeline.Item
                    label={dayjs(data.pickedUpAt).format('HH:mm DD/MM/YYYY')}
                  >
                    Đang lấy hàng
                  </Timeline.Item>
                )}
                {data.status >= 3 && (
                  <Timeline.Item
                    label={dayjs(data.packedAt).format('HH:mm DD/MM/YYYY')}
                  >
                    Đóng gói xong
                  </Timeline.Item>
                )}
                {data.status >= 4 && (
                  <Timeline.Item
                    label={dayjs(data.transportedAt).format('HH:mm DD/MM/YYYY')}
                  >
                    Đang vận chuyển
                  </Timeline.Item>
                )}
                {data.status >= 5 && (
                  <Timeline.Item
                    color='green'
                    label={dayjs(data.deliveriedAt).format('HH:mm DD/MM/YYYY')}
                  >
                    Giao hàng thành công
                  </Timeline.Item>
                )}
              </Timeline>
            </Card>
          </div>
          <Button
            icon={<FastBackwardOutlined />}
            type='link'
            onClick={() => {
              setView('default');
            }}
          >
            Quay lại hóa đơn của tôi
          </Button>
        </Fragment>
      )}
    </section>
  );
};
export default connect(null, { getOrderById })(TrackOrder);
