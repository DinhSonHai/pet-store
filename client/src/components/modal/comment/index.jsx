import { useState } from 'react';
import { Modal, Input, Form, Button } from 'antd';
import {} from '../../../redux/actions/review';
import { connect } from 'react-redux';
const ReviewDetail = ({ setView }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const onFinish = async (values) => {
    setConfirmLoading(true);

    setConfirmLoading(false);
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
      title='Bình luận'
    >
      <div className='comment-modal'>
        <Form size='large' layout='vertical' onFinish={onFinish}>
          <Form.Item
            label='Nội dung phản hồi'
            name='replyComment'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập bình luận!',
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder='Nội dung bình luận' />
          </Form.Item>
          <Form.Item style={{ textAlign: 'right' }}>
            <Button type='primary' loading={confirmLoading} htmlType='submit'>
              Gửi
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};
export default connect(null, {})(ReviewDetail);
