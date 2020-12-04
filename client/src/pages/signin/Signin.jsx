import { Form, Input, Button, Checkbox, Card, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { login } from '../../redux/actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './styles.scss';

const Signin = ({ login, history }) => {
  const onFinish = async (values) => {
    const { email, password } = values;
    const res = await login(email, password);
    if (res) {
      return history.push('/');
    }
  };
  return (
    <section className='login'>
      <div className='login__wrap container'>
        <div className='login__content'>
          <Row gutter={[0, 0]}>
            <Col xs={24} sm={24} md={24} lg={12}>
              <Card>
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
                  <Form.Item>
                    <Form.Item name='remember' valuePropName='checked' noStyle>
                      <Checkbox>Ghi nhớ tôi</Checkbox>
                    </Form.Item>

                    <Link className='login-form-forgot' to='/forgot'>
                      Quên mật khẩu?
                    </Link>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type='primary'
                      htmlType='submit'
                      className='login-form-button'
                    >
                      Đăng nhập
                    </Button>{' '}
                    hoặc <Link to='/signup'>Đăng ký ngay!</Link>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};
Signin.propType = {
  login: PropTypes.func.isRequired,
};
export default connect(null, { login })(Signin);
