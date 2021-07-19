import { useState } from 'react';
import { Modal, Input, Form, Button, Checkbox, Rate } from 'antd';
import dayjs from 'dayjs';
import { connect } from 'react-redux';

import { declineReview, responseReview } from '../../../redux/actions/reviews';
import { notifyActions } from '../../../utils/notify';

import './styles.scss';
const ReviewDetail = ({
  setView,
  data,
  declineReview,
  approveReview,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [response, setResponse] = useState(false);
  const [text, setText] = useState('');

  const onFinish = async () => {
    if (response && !text) {
      return notifyActions('error', 'Vui lòng nhập phản hồi!');
    }
    const { _id, productId } = data;
    console.log(data);
    if (_id && productId) {
      setConfirmLoading(true);
      await approveReview(_id, productId._id, { replyComment: text });
      setConfirmLoading(false);
      setView(false);
    }
  };
  const handleRemove = async (reviewId, productId) => {
    if (reviewId && productId) {
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
          <p className='review-detail__product'>
            <span>Sản phẩm: </span> <i>{data.productId.productName}</i>
          </p>
          <p className='review-detail__unconfirm'>
            <Button
              loading={confirmLoading}
              onClick={() => handleRemove(data._id, data.productId._id)}
              danger
            >
              Hủy đánh giá
            </Button>
          </p>
        </div>
        <p className='review-detail__name'>
          <span>Tên người dùng: </span> {data.name}
        </p>
        <p className='review-detail__date'>
          <span>Thời gian đánh giá: </span>{' '}
          {dayjs(data.commentedAt).format('HH:mm DD/MM/YYYY')}
        </p>
        <div className='review-detail__name'>
          <span>Số sao đánh giá: </span>{' '}
          <Rate
            style={{ fontSize: '0.85rem' }}
            disabled
            defaultValue={data.starRatings}
          />
        </div>
        <p className='review-detail__content'>
          <span>Nội dung: </span>
          <Input.TextArea
            readOnly
            style={{ marginTop: '1rem', cursor: 'default' }}
            rows={4}
            defaultValue={data.comment}
          />
        </p>
        <p className='review-detail__checkbox'>
          <Checkbox onChange={() => setResponse(!response)}>Phản hồi</Checkbox>
        </p>

        {response && (
          <div className='review-detail__form'>
            <Form id="responseForm" size='large' layout='vertical'>
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
                <Input.TextArea rows={4} placeholder='Nội dung phản hồi' onChange={(e) => setText(e.target.value)} />
              </Form.Item>
            </Form>
          </div>
        )}
        <p style={{ textAlign: 'right' }}>
          <Button
            onClick={onFinish}
            type='primary'
            style={{ marginRight: '1rem' }}
            loading={confirmLoading}
          >
            Duyệt
          </Button>
          <Button onClick={() => setView(false)}>Đóng</Button>
        </p>
      </div>
    </Modal>
  );
};
export default connect(null, { declineReview, responseReview })(ReviewDetail);
