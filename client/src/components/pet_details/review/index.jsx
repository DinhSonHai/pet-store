import { useState } from 'react';
import { Form, Input, Button, Card, Rate, message, notification } from 'antd';
import { connect } from 'react-redux';
import { review } from '../../../redux/actions/review';
import './styles.scss';

const desc = [
  'Rất không hài lòng',
  'Không hài lòng',
  'Tạm ổn',
  'Hài lòng',
  'Rất hài lòng',
];
const DetailReview = ({ auth: { isAuthenticated }, id, review }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [star, setStar] = useState(5);
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
            <Button type='primary' htmlType='submit' loading={confirmLoading}>
              Gửi đánh giá
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </section>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { review })(DetailReview);
