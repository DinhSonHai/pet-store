import { useState } from 'react';
import { Modal, Button } from 'antd';
import { connect } from 'react-redux';
import { RemoveAdress } from '../../../redux/actions/auth';
import PropTypes from 'prop-types';

const ConfirmModal = ({
  visible_remove,
  setVisibleRemove,
  RemoveAdress,
  id,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleCancel = () => {
    setVisibleRemove(false);
  };
  const onFinish = async () => {
    setConfirmLoading(true);
    await RemoveAdress(id);
    setVisibleRemove(false);
    setConfirmLoading(false);
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
  RemoveAdress: PropTypes.func.isRequired,
};

export default connect(null, { RemoveAdress })(ConfirmModal);
