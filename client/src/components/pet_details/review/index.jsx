import { useState } from 'react';
import { Form, Input, Button, Card, Rate, message, notification } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
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
const DetailReview = ({ auth: { isAuthenticated, user }, id, review }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [star, setStar] = useState(5);
  const history = useHistory();
  const onChange = (value) => {
    setStar(value);
  };
  const onFinish = async (values) => {
    if (!star) {
      return message.error('Vui lòng chọn số sao!');
    }
    if (!id) {
      return notification.open({
        message: 'Thông báo',
        description: 'Vui lòng chọn sản phẩm cần đánh giá!',
      });
    }
    if (!isAuthenticated) {
      return notification.open({
        message: 'Thông báo',
        description: 'Bạn cần đăng nhập để thực hiện chức năng này!',
      });
    }
    setConfirmLoading(true);
    await review({ ...values, starRatings: star }, id);
    setConfirmLoading(false);
  };
  return (
    <section className='pet-details__review'>
      <Card>
        {isAuthenticated ? (
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
              <Input.TextArea
                disabled={
                  user &&
                  !user.purchasedProducts.some(
                    (p) => p.toString() === id.toString()
                  )
                }
                rows={4}
                placeholder='Nội dung'
              />
            </Form.Item>
            <Form.Item style={{ textAlign: 'right' }}>
              {user &&
              user.purchasedProducts.some(
                (p) => p.toString() === id.toString()
              ) ? (
                <Button
                  type='primary'
                  htmlType='submit'
                  loading={confirmLoading}
                >
                  Gửi đánh giá
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    notification.open({
                      message: 'Thông báo',
                      description:
                        'Bạn chưa mua sản phẩm này nên không thể đánh giá!',
                    });
                  }}
                >
                  {`Bạn chưa mua sản phẩm này :(`}
                </Button>
              )}
            </Form.Item>
          </Form>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <Button
              icon={<LoginOutlined />}
              type='dashed'
              onClick={() => history.push('/signin')}
            >
              Đăng nhập để đánh giá
            </Button>
          </div>
        )}
      </Card>
    </section>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { review })(DetailReview);
