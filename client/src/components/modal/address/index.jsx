/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Modal, Button, Select, Form, Input, Checkbox } from 'antd';
import { getProvince, getWard, getTown } from '../../../api/address';
import { connect } from 'react-redux';
import { addAdress, updateAdress } from '../../../redux/actions/auth';
import PropTypes from 'prop-types';

const { Option } = Select;

const AddressModal = ({
  visible,
  setVisible,
  addAdress,
  updateAdress,
  edit,
  defaultValue,
  item,
}) => {
  const [form] = Form.useForm();
  const [ward, setWard] = useState([]);
  const [town, setTown] = useState([]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isDefault, setIsDefault] = useState(false);
  const [province, setProvince] = useState([]);
  const [countryState, setCountryState] = useState({
    p: '',
    w: '',
    t: '',
  });
  useEffect(() => {
    if (edit) {
      form.resetFields();
    }
    async function Get_Province() {
      const data = await getProvince();
      setProvince(data);
    }
    async function getData() {
      const { p_id, w_id, t_id } = item;
      if (edit && p_id && w_id) {
        setIsProcessing(true);
        const res = await Promise.all([getWard(p_id), getTown(w_id)]);
        setWard(res[0]);
        setTown(res[1]);
        setCountryState({ ...countryState, p: p_id, w: w_id, t: t_id });
        setIsProcessing(false);
      }
    }
    Get_Province();
    if (edit) {
      getData();
    }
  }, [item]);
  const handleCancel = () => {
    setVisible(false);
  };
  const onChangeProvince = async (values) => {
    if (!values) {
      return;
    }
    form.setFieldsValue({
      wardState: '',
      townState: '',
    });
    let id = parseInt(values);
    setIsProcessing(true);
    const data = await getWard(id);
    setWard(data);
    setCountryState({ ...countryState, p: id });
    if (countryState.w || countryState.t) {
      setCountryState({ ...countryState, w: null, t: null });
    }
    setIsProcessing(false);
  };
  const onChangeWard = async (values) => {
    if (!values) {
      return;
    }
    form.setFieldsValue({
      townState: '',
    });
    let id = parseInt(values);
    setIsProcessing(true);
    const data = await getTown(id);
    setTown(data);
    setCountryState({ ...countryState, w: id });
    if (countryState.t) {
      setCountryState({ ...countryState, t: null });
    }
    setIsProcessing(false);
  };
  const onChangeTown = (values) => {
    if (!values) {
      return;
    }
    let id = parseInt(values);
    setCountryState({ ...countryState, t: id });
  };
  const onFinish = async (values) => {
    const { moreInfo, provinceState, wardState, townState } = values;
    const { p, w, t } = countryState;
    if (edit) {
      setConfirmLoading(true);
      const res = await updateAdress({
        provinceState: p ? provinceState : p,
        wardState: w ? wardState : w,
        townState: t ? townState : t,
        moreInfo,
        isDefault,
        address_id: item._id,
      });
      setConfirmLoading(false);
      if (res) {
        setVisible(false);
      }
      return;
    }
    setConfirmLoading(true);
    const res = await addAdress({
      provinceState: p ? provinceState : p,
      wardState: w ? wardState : w,
      townState: t ? townState : t,
      moreInfo,
      isDefault,
    });
    setConfirmLoading(false);
    if (res) {
      setVisible(false);
    }
  };
  return (
    <Modal
      maskClosable={!confirmLoading}
      closable={false}
      title={!edit ? 'Thêm địa chỉ' : 'Sửa địa chỉ'}
      visible={visible}
      onOk={onFinish}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={false}
    >
      <Form
        form={form}
        layout='vertical'
        name='normal_login'
        className='login-form'
        onFinish={onFinish}
      >
        <Form.Item
          initialValue={edit && item ? item.p_id : ''}
          name='provinceState'
          label='Tỉnh/Thành Phố'
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn Tỉnh/Thành Phố!',
            },
          ]}
        >
          <Select
            loading={isProcessing}
            disabled={isProcessing}
            onChange={onChangeProvince}
          >
            <Option value={''}>Chọn Tỉnh/Thành Phố</Option>
            {province.map((item) => (
              <Option
                key={parseInt(item.province_id)}
                value={parseInt(item.province_id)}
              >
                {item.province_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          initialValue={edit && item ? item.w_id : ''}
          name='wardState'
          label='Quận/Huyện'
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn Quận/Huyện!',
            },
          ]}
        >
          <Select
            loading={isProcessing}
            disabled={isProcessing}
            onChange={onChangeWard}
          >
            <Option value={''}>Chọn Quận/Huyện</Option>
            {ward.map((item) => (
              <Option
                key={parseInt(item.district_id)}
                value={parseInt(item.district_id)}
              >
                {item.district_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          initialValue={edit && item ? item.t_id : ''}
          name='townState'
          label='Phường/Xã'
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn Phường/Xã!',
            },
          ]}
        >
          <Select
            loading={isProcessing}
            disabled={isProcessing}
            onChange={onChangeTown}
          >
            <Option value={''}>Chọn Phường/Xã</Option>
            {town.map((item) => (
              <Option
                key={parseInt(item.ward_id)}
                value={parseInt(item.ward_id)}
              >
                {item.ward_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          initialValue={edit && item ? item.m : ''}
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập địa chỉ!',
            },
          ]}
          name='moreInfo'
          label='Địa chỉ'
        >
          <Input.TextArea />
        </Form.Item>
        {defaultValue ? null : (
          <Form.Item valuePropName='check'>
            <Checkbox onChange={(e) => setIsDefault(e.target.checked)}>
              Địa chỉ mặc định
            </Checkbox>
          </Form.Item>
        )}

        <Form.Item style={{ textAlign: 'right' }}>
          <Button
            style={{ marginRight: '1rem' }}
            disabled={confirmLoading}
            onClick={handleCancel}
          >
            Hủy
          </Button>
          <Button type='primary' loading={confirmLoading} htmlType='submit'>
            {edit ? 'Lưu' : 'Thêm'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
AddressModal.propTypes = {
  addAdress: PropTypes.func.isRequired,
  updateAdress: PropTypes.func.isRequired,
};

export default connect(null, { addAdress, updateAdress })(AddressModal);
