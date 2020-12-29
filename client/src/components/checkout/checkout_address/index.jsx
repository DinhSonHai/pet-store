/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useState, useEffect } from 'react';
import { Card } from 'antd';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import store from '../../../store';
import { CheckoutAddressModal } from '../../../components';
import { UPDATE_AUTH_ADDRESS } from '../../../redux/types';
const CheckoutAddress = ({
  auth: { isAuthenticated, user },
  checkout: { authState },
  setVisible,
  visible,
}) => {
  const [address, setAddress] = useState('');
  const history = useHistory();
  useEffect(() => {
    if (!authState) {
      let length = user.address.length;
      if (length && length > 0) {
        for (let i = 0; i < length; ++i) {
          if (user.address[i].isDefault) {
            store.dispatch({
              type: UPDATE_AUTH_ADDRESS,
              payload: { address: user.address[i].value },
            });
            setAddress(user.address[i].value);
            return;
          }
        }
      }
      return;
    }
    setAddress(authState.address);
  }, [authState]);
  return (
    <Fragment>
      <CheckoutAddressModal visible={visible} setVisible={setVisible} />
      {isAuthenticated && user.address.length > 0 ? (
        <Card
          style={{ marginBottom: '1rem' }}
          title='Địa chỉ giao hàng'
          extra={
            <div
              style={{ color: 'var(--mainstream-color)', cursor: 'pointer' }}
              onClick={() => setVisible(true)}
            >
              Sửa
            </div>
          }
        >
          <p>
            <b>Họ tên: </b> <i>{user.name}</i>
          </p>
          <p>
            <b>Điện thoại: </b> <i>{user.phoneNumber}</i>
          </p>
          <p>
            <b>Địa chỉ: </b> <i>{address}</i>
          </p>
        </Card>
      ) : (
        user.address.length <= 0 && (
          <p style={{ textAlign: 'center' }}>
            (<span style={{ color: 'var(--danger-color)' }}>*</span>) Có vẻ như
            bạn chưa có địa chỉ trong tài khoản, hãy thêm địa chỉ của bạn trong{' '}
            <span
              onClick={() => history.push('/profile/?tab=address')}
              style={{ color: 'var(--mainstream-color)', cursor: 'pointer' }}
            >
              Sổ địa chỉ
            </span>{' '}
            để tiếp tục.
          </p>
        )
      )}
      {!user.phoneNumber && (
        <p style={{ textAlign: 'center' }}>
          (<span style={{ color: 'var(--danger-color)' }}>*</span>) Bạn cần cung
          cấp số điện thoại trong{' '}
          <span
            onClick={() => history.push('/profile/?tab=info')}
            style={{ color: 'var(--mainstream-color)', cursor: 'pointer' }}
          >
            Tài khoản
          </span>{' '}
          để tiếp tục.
        </p>
      )}
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  checkout: state.checkout,
});
export default connect(mapStateToProps, {})(CheckoutAddress);
