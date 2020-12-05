import { useState } from 'react';
import { Form, Input, Button, Select, DatePicker, Card, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../redux/actions/auth';
import PropTypes from 'prop-types';
import './styles.scss';

const { Option } = Select;
const Signup = ({ register }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const onFinish = async (values) => {
    if (localStorage.token) {
      return window.location.reload(false);
    }
    const { name, email, phone, password, gender } = values;
    setIsProcessing(true);
    await register({
      name,
      email,
      phoneNumber: phone,
      password,
      gender,
      dateOfBirth: values['dateOfBirth'].toISOString(),
    });
    setIsProcessing(false);
    console.log(values);
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  return (
    <section className='signup'>
      <div className='signup__wrap container'>
        <div className='signup__content'>
          <Row gutter={[0, 0]}>
            <Col xs={24} sm={24} lg={14}>
              <Card>
                <h1 className='signup__title'>Đăng ký</h1>
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
                    name='email'
                    label='E-mail'
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
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name='name'
                    label='Tên'
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập tên!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name='phone'
                    label='Số điện thoại'
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập số điện thoại!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
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
                  <Form.Item
                    name='gender'
                    label='Giới tính'
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn giới tính!',
                      },
                    ]}
                  >
                    <Select allowClear>
                      <Option value={0}>male</Option>
                      <Option value={1}>female</Option>
                      <Option value={2}>other</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name='dateOfBirth'
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn ngày sinh!',
                      },
                    ]}
                    label='Ngày sinh'
                  >
                    <DatePicker />
                  </Form.Item>
                  <Form.Item {...tailFormItemLayout}>
                    <Button
                      loading={isProcessing}
                      type='primary'
                      htmlType='submit'
                    >
                      Đăng ký
                    </Button>{' '}
                    hoặc <Link to='/signin'>Đăng nhập</Link>
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
Signup.propTypes = {
  register: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { register })(Signup);
