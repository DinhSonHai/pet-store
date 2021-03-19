import { useState } from 'react';
import { Form, Button, Input, Modal } from 'antd';
const CategoryAddForm = ({ visible, setVisible, createCategory }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleCancel = () => {
    setVisible(false);
  };
  const onFinish = async (values) => {
    setConfirmLoading(true);
    await createCategory(values);
    setConfirmLoading(false);
    setVisible(false);
  };
  return (
    <Modal
      closable={false}
      footer={false}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      visible={visible}
      onOk={onFinish}
      maskClosable={!confirmLoading}
      title='Thêm danh mục'
    >
      <Form size='large' layout='vertical' onFinish={onFinish}>
        <Form.Item
          label='Tên danh mục'
          name='categoryName'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập Tên danh mục!',
            },
          ]}
        >
          <Input placeholder='Tên danh mục' />
        </Form.Item>
        <Form.Item style={{ textAlign: 'right' }}>
          <Button
            style={{ marginRight: '1rem' }}
            disabled={confirmLoading}
            onClick={handleCancel}
          >
            Hủy
          </Button>
          <Button type='primary' loading={confirmLoading} htmlType='submit'>
            {'Thêm'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default CategoryAddForm;
