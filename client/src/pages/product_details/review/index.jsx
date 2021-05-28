import { useState } from 'react';
import { Form, Input, Button, Card, Rate } from 'antd';
import { notifyActions } from '../../../utils/notify';
import { LoginOutlined, SmileOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { review } from '../../../redux/actions/review';
import './styles.scss';

const desc = [
  'Rất không hài lòng',
  'Không hài lòng',
  'Tạm ổn',
  'Hài lòng',
  'Rất hài lòng',
];
const DetailReview = ({
  auth: { isAuthenticated, user },
  id,
  review,
  isReviewed,
  isPurchased,
}) => {
  const [reviewState, setReviewState] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [star, setStar] = useState(5);
  const history = useHistory();
  const onChange = (value) => {
    setStar(value);
  };
  const onFinish = async (values) => {
    if (!star) {
      return notifyActions('error', 'Vui lòng chọn số sao!');
    }
    if (!id) {
      return notifyActions('error', 'Vui lòng chọn sản phẩm cần đánh giá!');
    }
    if (!isAuthenticated) {
      return notifyActions(
        'error',
        'Bạn cần đăng nhập để thực hiện chức năng này!'
      );
    }
    setConfirmLoading(true);
    const res = await review({ ...values, starRatings: star }, id);
    if (res) {
      setReviewState(false);
    }
    setConfirmLoading(false);
  };
  return (
    <section className='product-details__review'>
      {isReviewed !== 1 && (
        <Card bordered={false}>
          {isAuthenticated &&
          isReviewed === false &&
          isPurchased &&
          reviewState ? (
            <Form
              layout='vertical'
              name='normal_review'
              size='large'
              onFinish={onFinish}
            >
              <Form.Item>
                <Rate tooltips={desc} defaultValue={star} onChange={onChange} />
                {star ? (
                  <span className='ant-rate-text'>{desc[star - 1]}</span>
                ) : (
                  ''
                )}
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập nội dung!',
                  },
                ]}
                name='comment'
                label='Nội dung'
              >
                <Input.TextArea rows={4} placeholder='Nội dung' />
              </Form.Item>
              <Form.Item style={{ textAlign: 'right' }}>
                <Button
                  type='primary'
                  htmlType='submit'
                  loading={confirmLoading}
                >
                  Gửi đánh giá
                </Button>
              </Form.Item>
            </Form>
          ) : isReviewed === 0 || !reviewState ? (
            <div style={{ textAlign: 'center' }}>
              Đánh giá của bạn đang chờ phê duyệt
            </div>
          ) : !isPurchased && !isAuthenticated ? (
            <div style={{ textAlign: 'center' }}>
              <Button
                icon={<LoginOutlined />}
                type='default'
                onClick={() => history.push('/signin')}
              >
                Đăng nhập và mua hàng để đánh giá
              </Button>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <Button icon={<SmileOutlined />} type='default'>
                Mua hàng để đánh giá nào!
              </Button>
            </div>
          )}
        </Card>
      )}
    </section>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { review })(DetailReview);
