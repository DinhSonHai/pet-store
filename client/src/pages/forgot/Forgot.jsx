/* eslint-disable import/no-anonymous-default-export */
import { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { forgotPassword } from '../../redux/actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './styles.scss';

const Forgot = ({ forgotPassword }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const onFinish = async (values) => {
    if (localStorage.token) {
      return window.location.reload(false);
    }
    const { email } = values;
    setIsProcessing(true);
    await forgotPassword({ email });
    setIsProcessing(false);
  };
  return (
    <section className='forget'>
      <div className='forget__wrap container'>
        <div className='forget__content'>
          <Card style={{ maxWidth: '600px', margin: 'auto' }}>
            <h1 className='login__title'>Quên mật khẩu</h1>
            <Form
              name='normal_login'
              className='login-form'
              initialValues={{
                remember: true,
                size: 'large',
              }}
              size='large'
              onFinish={onFinish}
            >
              <Form.Item
                name='email'
                rules={[
                  {
                    type: 'email',
                    message: 'Email không hợp lệ',
                  },
                  {
                    required: true,
                    message: 'Vui lòng nhập email!',
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className='site-form-item-icon' />}
                  placeholder='Email'
                />
              </Form.Item>

              <Form.Item style={{ textAlign: 'center' }}>
                <Button loading={isProcessing} type='primary' htmlType='submit'>
                  Xác nhận
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </section>
  );
};
Forgot.propType = {
  forgotPassword: PropTypes.func.isRequired,
};
export default connect(null, { forgotPassword })(Forgot);
