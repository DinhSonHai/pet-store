/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { resetPassword } from '../../redux/actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './styles.scss';

const Reset = ({ resetPassword, match }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [token, setToken] = useState('');
  useEffect(() => {
    let getToken = match.params.token;
    if (getToken) {
      setToken(getToken);
    }
  }, []);
  const onFinish = async (values) => {
    if (localStorage.token) {
      return window.location.reload(false);
    }
    const { password } = values;
    setIsProcessing(true);
    await resetPassword({ password, resetPasswordLink: token });
    setIsProcessing(false);
  };
  return (
    <section className='reset'>
      <div className='reset__wrap container'>
        <div className='reset__content'>
          <Card style={{ maxWidth: '600px', margin: 'auto' }}>
            <h1 className='reset__title'>Đặt lại mật khẩu</h1>
            <Form
              layout='vertical'
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
                name='password'
                label='Mật khẩu'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name='confirm'
                label='Xác nhận mật khẩu'
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng xác nhận mật khẩu!',
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject('Mật khẩu không khớp!');
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item style={{ textAlign: 'center' }}>
                <Button
                  loading={isProcessing}
                  type='primary'
                  htmlType='submit'
                  className='login-form-button'
                >
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
Reset.propType = {
  resetPassword: PropTypes.func.isRequired,
};

export default connect(null, { resetPassword })(Reset);
