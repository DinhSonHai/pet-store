import { useState } from 'react';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { login, loginGoogle, loginFacebook } from '../../redux/actions/auth';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GooglePlus, Facebook } from '../../icons';
import {
  REACT_APP_GOOGLE_CLIENT,
  REACT_APP_FACEBOOK_CLIENT,
} from '../../config/login';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './styles.scss';

const Signin = ({ login, loginGoogle, loginFacebook, history }) => {
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

  // Handle login with Google Account
  const googleLoginHandle = async (idToken) => {
    if (localStorage.token) {
      return window.location.reload(false);
    }
    if (!idToken) {
      return;
    }
    const res = await loginGoogle(idToken);
    if (res) {
      return history.push('/');
    }
  };
  const responseGoogle = (response) => {
    googleLoginHandle(response.tokenId);
  };

  // Handle login with Facebook Account
  const facebookLoginHandle = async (userID, accessToken) => {
    if (localStorage.token) {
      return window.location.reload(false);
    }
    if (!userID || !accessToken) {
      return;
    }
    const res = await loginFacebook(userID, accessToken);
    if (res) {
      return history.push('/');
    }
  };

  const responseFacebook = (response) => {
    facebookLoginHandle(response.userID, response.accessToken);
  };
  return (
    <section className='login'>
      <div className='login__wrap container'>
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
                </Button>{' '}
                hoặc <Link to='/signup'>Đăng ký ngay!</Link>
              </Form.Item>
            </Form>
            <p style={{ textAlign: 'center' }}>hoặc đăng nhập với</p>
            <p className='login__social'>
              <GoogleLogin
                clientId={REACT_APP_GOOGLE_CLIENT}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                render={(renderProps) => (
                  <Button
                    className='login__google'
                    type='primary'
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#d73d32',
                    }}
                    danger
                    size={'large'}
                    onClick={renderProps.onClick}
                  >
                    <GooglePlus />
                    <div style={{ margin: '0 1.5rem' }}>Google+</div>
                  </Button>
                )}
              />
              <FacebookLogin
                appId={REACT_APP_FACEBOOK_CLIENT}
                autoLoad={false}
                fields='name,email,picture'
                callback={responseFacebook}
                render={(renderProps) => (
                  <Button
                    className='login__facebook'
                    type='primary'
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#0a426e',
                    }}
                    size={'large'}
                    onClick={renderProps.onClick}
                  >
                    <Facebook />
                    <div style={{ margin: '0 1.4rem' }}>Facebook</div>
                  </Button>
                )}
              />
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
Signin.propType = {
  login: PropTypes.func.isRequired,
  loginGoogle: PropTypes.func.isRequired,
  loginFacebook: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { login, loginGoogle, loginFacebook })(
  Signin
);
