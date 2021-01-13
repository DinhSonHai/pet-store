import { useState } from 'react';
import { Modal, Button } from 'antd';
import { connect } from 'react-redux';
import { removeAdress } from '../../../redux/actions/auth';
import PropTypes from 'prop-types';

const ConfirmModal = ({
  visible_remove,
  setVisibleRemove,
  removeAdress,
  id,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleCancel = () => {
    setVisibleRemove(false);
  };
  const onFinish = async () => {
    setConfirmLoading(true);
    await removeAdress(id);
    setConfirmLoading(false);
    setVisibleRemove(false);
  };
  return (
    <Modal
      centered
      maskClosable={!confirmLoading}
      onOk={onFinish}
      closable={false}
      footer={false}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      visible={visible_remove}
    >
      <h3 style={{ textAlign: 'center' }}>Bạn có chắc muốn xóa chứ!?</h3>
      <div style={{ textAlign: 'center' }}>
        <Button
          style={{ marginRight: '2rem' }}
          disabled={confirmLoading}
          onClick={handleCancel}
        >
          Hủy
        </Button>
        <Button type='primary' onClick={onFinish} loading={confirmLoading}>
          Đồng ý
        </Button>
      </div>
    </Modal>
  );
};
ConfirmModal.propTypes = {
  removeAdress: PropTypes.func.isRequired,
};

export default connect(null, { removeAdress })(ConfirmModal);
