import { useState } from 'react';
import { ProfileMain, AddressModal, ConfirmModal } from '../../../components';
import { Button, Card } from 'antd';
import { PlusOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import './styles.scss';

const Address = ({ location, auth: { user } }) => {
  const [visible, setVisible] = useState(false);
  const [visible_remove, setVisibleRemove] = useState(false);
  const [id, setId] = useState(null);
  const [item, setItem] = useState(null);
  const [defaultValue, setDefaultValue] = useState(false);

  const [edit, setEdit] = useState(false);
  const showModalAdd = () => {
    setEdit(false);
    setDefaultValue(false);
    setVisible(true);
  };
  const showModalEdit = () => {
    setEdit(true);
    setVisible(true);
  };
  return (
    <ProfileMain checkPage={location.pathname}>
      <h3 className='profile__title'>Sổ địa chỉ</h3>
      <div className='profile__main--address'>
        <Button
          style={{ height: '60px' }}
          type='dashed'
          icon={<PlusOutlined />}
          block
          onClick={showModalAdd}
        >
          Thêm địa chỉ
        </Button>
        <div className='profile__main--address-list'>
          <AddressModal
            visible={visible}
            setVisible={setVisible}
            edit={edit}
            defaultValue={defaultValue}
            item={item}
          />
          <ConfirmModal
            visible_remove={visible_remove}
            setVisibleRemove={setVisibleRemove}
            id={id}
          />

          {user.address
            .sort((x, y) => {
              return x.isDefault === y.isDefault ? 0 : x.isDefault ? -1 : 1;
            })
            .map((item) => (
              <Card key={item._id} style={{ margin: '1rem 0' }}>
                {item.isDefault ? (
                  <p style={{ color: '#5fdba7' }}>
                    <CheckCircleOutlined /> Mặc định
                  </p>
                ) : null}
                <p>
                  <span style={{ color: '#999' }}>Địa chỉ: </span>
                  {item.value}
                </p>
                <div style={{ textAlign: 'right' }}>
                  <Button
                    onClick={() => {
                      showModalEdit();
                      setItem(item);
                      setDefaultValue(item.isDefault);
                    }}
                    type='link'
                  >
                    Sửa
                  </Button>
                  {item.isDefault ? null : (
                    <Button
                      onClick={() => {
                        setVisibleRemove(true);
                        setId(item._id);
                      }}
                      style={{ marginLeft: '0.5rem' }}
                      type='link'
                      danger
                    >
                      Xóa
                    </Button>
                  )}
                </div>
              </Card>
            ))}
        </div>
      </div>
    </ProfileMain>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(Address);
