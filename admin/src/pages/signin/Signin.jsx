import { useState } from 'react';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { login } from '../../redux/actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './styles.scss';

const Signin = ({ login, history }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle login with PetStore Account
  const onFinish = async (values) => {
    if (localStorage.token) {
      return window.location.reload(false);
    }
    const { email, password } = values;
    setIsProcessing(true);
    const res = await login(email, password);
    if (res) {
      return history.push('/');
    }
    setIsProcessing(false);
  };
  return (
    <section className='login'>
      <div className='login__wrap site-layout-background'>
        <div className='login__content'>
          <Card style={{ maxWidth: '600px', margin: 'auto' }}>
            <h1 className='login__title'>Đăng nhập</h1>
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
              <Form.Item
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu!',
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  type='password'
                  placeholder='Mật khẩu'
                />
              </Form.Item>
              <Form.Item style={{ textAlign: 'center' }}>
                <Form.Item name='remember' valuePropName='checked' noStyle>
                  <Checkbox>Ghi nhớ tôi</Checkbox>
                </Form.Item>

                <Link className='login-form-forgot' to='/forget'>
                  Quên mật khẩu?
                </Link>
              </Form.Item>

              <Form.Item style={{ textAlign: 'center' }}>
                <Button
                  loading={isProcessing}
                  type='primary'
                  htmlType='submit'
                  className='login-form-button'
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </section>
  );
};
Signin.propType = {
  login: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { login })(Signin);
