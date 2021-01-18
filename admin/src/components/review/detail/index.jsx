import { useState } from 'react';
import { Modal, Input, Form, Button, Checkbox, Rate } from 'antd';
import dayjs from 'dayjs';
import { declineReview } from '../../../redux/actions/reviews';
import { connect } from 'react-redux';
import './styles.scss';
const ReviewDetail = ({ setView, data, declineReview }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [response, setResponse] = useState(false);
  const onFinish = async (values) => {};
  const handleRemove = async (reviewId, productId) => {
    if ((reviewId, productId)) {
      setConfirmLoading(true);
      await declineReview(reviewId, productId);
      setConfirmLoading(false);
      setView(false);
    }
  };
  return (
    <Modal
      width={1200}
      onCancel={() => {
        if (setView) {
          setView(false);
        }
      }}
      footer={false}
      visible={true}
      centered
      maskClosable={false}
      title='Chi tiết đánh giá'
    >
      <div className='review-detail'>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p className='review-detail__name'>
            <span>Tên người dùng: </span> {data.name}
          </p>
          <p className='review-detail__unconfirm'>
            <Button
              loading={confirmLoading}
              onClick={() => handleRemove(data._id, data.productId)}
              danger
            >
              Hủy đánh giá
            </Button>
          </p>
        </div>
        <p className='review-detail__date'>
          <span>Thời gian đánh giá: </span>{' '}
          {dayjs(data.commentedAt).format('HH:mm DD/MM/YYYY')}
        </p>
        <p className='review-detail__name'>
          <span>Số sao đánh giá: </span>{' '}
          <Rate
            style={{ fontSize: '0.85rem' }}
            disabled
            defaultValue={data.starRatings}
          />
        </p>
        <p className='review-detail__content'>
          <span>Nội dung: </span>
          <Input.TextArea
            style={{ marginTop: '1rem' }}
            rows={4}
            defaultValue={data.comment}
          />
        </p>
        <p className='review-detail__checkbox'>
          <Checkbox onChange={() => setResponse(!response)}>Phản hồi</Checkbox>
        </p>

        {response && (
          <p className='review-detail__form'>
            <Form size='large' layout='vertical' onFinish={onFinish}>
              <Form.Item
                label='Nội dung phản hồi'
                name='replyComment'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập phản hồi!',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder='Nội dung phản hồi' />
              </Form.Item>
              <Form.Item style={{ textAlign: 'right' }}>
                <Button
                  type='primary'
                  loading={confirmLoading}
                  htmlType='submit'
                >
                  Phản hồi
                </Button>
              </Form.Item>
            </Form>
          </p>
        )}
        <p style={{ textAlign: 'right' }}>
          <Button onClick={() => setView(false)}>Đóng</Button>
        </p>
      </div>
    </Modal>
  );
};
export default connect(null, { declineReview })(ReviewDetail);
