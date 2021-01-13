import { useState } from 'react';
import { Form, Input, Button, Select, DatePicker, Card } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../redux/actions/auth';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import './styles.scss';

const { Option } = Select;
const Signup = ({ register }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const onFinish = async (values) => {
    if (localStorage.token) {
      return window.location.reload(false);
    }
    const { name, email, phone, password, gender, dateOfBirth } = values;
    setIsProcessing(true);
    await register({
      name,
      email,
      phoneNumber: phone,
      password,
      gender,
      dateOfBirth: dayjs(dateOfBirth).toISOString(),
    });
    setIsProcessing(false);
  };
  return (
    <section className='signup'>
      <div className='signup__wrap container'>
        <div className='signup__content'>
          <Card style={{ maxWidth: '600px', margin: 'auto' }}>
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
                initialValue={0}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn giới tính!',
                  },
                ]}
              >
                <Select>
                  <Option value={0}>Nam</Option>
                  <Option value={1}>Nữ</Option>
                  <Option value={2}>Khác</Option>
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
                <DatePicker allowClear={false} format='DD/MM/YYYY' />
              </Form.Item>
              <Form.Item style={{ textAlign: 'center' }}>
                <Button loading={isProcessing} type='primary' htmlType='submit'>
                  Đăng ký
                </Button>{' '}
                hoặc <Link to='/signin'>Đăng nhập</Link>
              </Form.Item>
            </Form>
          </Card>
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
