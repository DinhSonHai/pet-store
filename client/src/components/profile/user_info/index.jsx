import { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateUserInfo } from '../../../redux/actions/auth';
import moment from 'moment';
import {
  Card,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Checkbox,
  notification,
} from 'antd';
import { ProgressBar } from '../../../components';
import imageCompression from 'browser-image-compression';
import Compressor from 'compressorjs';
import './styles.scss';

const { Option } = Select;
const UserInfo = ({ auth: { user }, updateUserInfo }) => {
  const [passStatus, setPassStatus] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [imageUrl, setImageUpdateUser] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const types = ['image/png', 'image/jpeg', 'image/jpg'];
  const uploadAvatar = async (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      let file_size = selected.size;
      if (parseInt(file_size) > 2097152) {
        return notification.open({
          message: 'Lỗi!',
          description: 'Ảnh đại diện có dung lượng phải bé hơn 2mb',
        });
      }
      const options = {
        maxSizeMB: 2,
        maxWidthOrHeight: 300,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(selected, options);
        new Compressor(compressedFile, {
          quality: 0.8,
          success(result) {
            setFile(result);
            setError('');
          },
          error(err) {
            console.log(err.message);
          },
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      setFile(null);
      setError('Vui lòng chọn định dạng file ảnh png hay jpeg/jpg !');
    }
  };
  const onFinish = async (values) => {
    const { name, password, password_old, phone, gender, dateOfBirth } = values;
    let avatar = imageUrl;
    setIsProcessing(true);
    await updateUserInfo({
      name,
      password,
      password_old,
      avatar,
      phone,
      gender,
      dateOfBirth: new Date(dateOfBirth).toISOString(),
    });
    setIsProcessing(false);
  };
  return (
    <Fragment>
      <h3 className='profile__title'>Thông tin tài khoản</h3>
      <Card className='profile__main--card profile__main--user'>
        <Form
          layout='vertical'
          name='normal_login'
          className='login-form'
          initialValues={{
            size: 'large',
          }}
          size='large'
          onFinish={onFinish}
        >
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên!',
              },
            ]}
            initialValue={user.name}
            name='name'
            label='Tên'
          >
            <Input />
          </Form.Item>
          <Form.Item initialValue={user.email} name='email' label='E-mail'>
            <Input disabled />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số điện thoại!',
              },
            ]}
            initialValue={user.phoneNumber}
            name='phone'
            label='Số điện thoại'
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn giới tính!',
              },
            ]}
            initialValue={user.gender}
            name='gender'
            label='Giới tính'
          >
            <Select>
              <Option value={0}>Nam</Option>
              <Option value={1}>Nữ</Option>
              <Option value={2}>Khác</Option>
            </Select>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn ngày sinh!',
              },
            ]}
            initialValue={moment(user.dateOfBirth)}
            name='dateOfBirth'
            label='Ngày sinh'
          >
            <DatePicker allowClear={false} format='DD/MM/YYYY' />
          </Form.Item>
          <Form.Item label='Hình đại diện'>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img alt='Avt' src={user.avatar} className='profile__avt' />
              <input
                accept='image/*'
                type='file'
                name='avatar'
                onChange={uploadAvatar}
              />
            </div>
          </Form.Item>

          <div style={{ width: '100%' }}>
            {error && <div style={{ color: '#dc3545' }}>{error}</div>}
            {file && <div>{file.name}</div>}
            {file && (
              <ProgressBar
                file={file}
                setImageUpdateUser={setImageUpdateUser}
                setFile={setFile}
              />
            )}
          </div>

          <Form.Item>
            <Checkbox onChange={() => setPassStatus(!passStatus)}>
              Thay đổi mật khẩu
            </Checkbox>
          </Form.Item>
          {passStatus && (
            <Fragment>
              <Form.Item name='password_old' label='Mật khẩu cũ'>
                <Input.Password />
              </Form.Item>
              <Form.Item hasFeedback name='password' label='Mật khẩu mới'>
                <Input.Password />
              </Form.Item>
              <Form.Item
                dependencies={['password']}
                hasFeedback
                rules={[
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('Mật khẩu không khớp!');
                    },
                  }),
                ]}
                name='confirm'
                label='Xác nhận mật khẩu'
              >
                <Input.Password />
              </Form.Item>
            </Fragment>
          )}
          <Form.Item style={{ textAlign: 'right' }}>
            <Button loading={isProcessing} type='primary' htmlType='submit'>
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Fragment>
  );
};
UserInfo.propTypes = {
  updateUserInfo: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { updateUserInfo })(UserInfo);
