import { Modal, Button, Card } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { UPDATE_AUTH_ADDRESS } from '../../../redux/types';
import store from '../../../store';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const CheckoutAddressModal = ({ visible, setVisible, auth: { user } }) => {
  const history = useHistory();
  const handleCancel = () => {
    setVisible(false);
  };
  const onFinish = (values) => {
    store.dispatch({
      type: UPDATE_AUTH_ADDRESS,
      payload: { address: values },
    });
    setVisible(false);
  };
  return (
    <Modal
      title={'Chọn địa chỉ'}
      visible={visible}
      onOk={onFinish}
      onCancel={handleCancel}
      footer={false}
    >
      {user &&
        user.address.map((item) => (
          <Card key={item._id} style={{ marginBottom: '1rem' }}>
            {item.isDefault && (
              <p style={{ color: '#5fdba7' }}>
                <CheckCircleOutlined /> Mặc định
              </p>
            )}
            <p>
              <b>Địa chỉ: </b> <i>{item.value}</i>
            </p>
            <div style={{ textAlign: 'right' }}>
              <Button
                onClick={() => history.push('/profile/?tab=address')}
                type='link'
                danger
              >
                Sửa
              </Button>
              <Button
                onClick={() => onFinish(item.value)}
                style={{ marginLeft: '0.5rem' }}
                type='link'
              >
                Chọn
              </Button>
            </div>
          </Card>
        ))}
      <div style={{ textAlign: 'right' }}>
        <Button onClick={handleCancel}>Hủy</Button>
      </div>
    </Modal>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(CheckoutAddressModal);
