/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Form, Button, Input, Modal, Select, message } from 'antd';
import { ProgressBar } from '../../../components';
import api from '../../../api';
const { Option } = Select;
const TypeAddForm = ({
  visible,
  setVisible,
  createType,
  editType,
  edit,
  item,
}) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [categoryState, setCategoryState] = useState([]);
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const types = ['image/png', 'image/jpeg', 'image/jpg'];
  useEffect(() => {
    if (edit) {
      form.resetFields();
      setImages([item.typeImg]);
    }
    async function getCategories() {
      setIsProcessing(true);
      const res = await api.get('/categories');
      setCategoryState(res.data);
      setIsProcessing(false);
    }
    getCategories();
  }, [item]);
  const handleCancel = () => {
    setVisible(false);
  };
  const uploadImages = async (e) => {
    setImages([]);
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      let file_size = selected.size;
      if (parseInt(file_size) > 2097152) {
        return message.error('Ảnh phải có dung lượng phải bé hơn 2mb');
      }
      setFile(selected);
      setError('');
    } else {
      setFile(null);
      setError('Vui lòng chọn định dạng file ảnh png hay jpeg/jpg !');
    }
  };
  const onFinish = async (values) => {
    if (images.length <= 0) {
      return message.error('Vui lòng chọn hình ảnh!');
    }
    if (!edit) {
      if (values) {
        setConfirmLoading(true);
        await createType({ ...values, typeImg: images[0] });
        setConfirmLoading(false);
        setVisible(false);
      }
      return;
    }
    if (values) {
      setConfirmLoading(true);
      await editType({ ...values, typeImg: images[0], id: item._id });
      setConfirmLoading(false);
      setVisible(false);
    }
  };
  return (
    <Modal
      style={{ wordBreak: 'break-word' }}
      closable={false}
      footer={false}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      visible={visible}
      onOk={onFinish}
      maskClosable={!confirmLoading}
      title={edit ? 'Sửa loại SP' : 'Thêm loại SP'}
    >
      <Form form={form} size='large' layout='vertical' onFinish={onFinish}>
        <Form.Item
          initialValue={edit ? item.typeName : ''}
          label='Tên loại SP'
          name='typeName'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập Tên loại SP!',
            },
          ]}
        >
          <Input placeholder='Tên loại SP' />
        </Form.Item>
        <Form.Item
          initialValue={edit ? item.categoryId._id : ''}
          label='Danh mục'
          name='categoryId'
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn danh mục!',
            },
          ]}
        >
          <Select loading={isProcessing} disabled={isProcessing}>
            <Option value={''}>Chọn danh mục</Option>
            {categoryState.map((cat) => (
              <Option key={cat._id} value={cat._id}>
                {cat.categoryName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item style={{ textAlign: 'center' }} label='Ảnh loại sp'>
          {images.length > 0 && (
            <img
              alt='Avt'
              src={images[0]}
              style={{
                width: '100px',
                height: '150px',
                borderRadius: '5px',
                objectFit: 'cover',
                margin: '0 auto 1rem',
              }}
            />
          )}
          <input
            accept='image/*'
            type='file'
            name='typeImg'
            onChange={uploadImages}
          />
        </Form.Item>
        <div style={{ width: '100%', marginBottom: '1rem' }}>
          {error && <div style={{ color: '#dc3545' }}>{error}</div>}
          {file && (
            <div
              style={
                file.name.length > 20
                  ? {
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                    }
                  : {}
              }
            >
              {file.name}
            </div>
          )}
          {file && (
            <ProgressBar
              file={file}
              setImages={setImages}
              setFile={setFile}
              images={images}
            />
          )}
        </div>
        <Form.Item style={{ textAlign: 'right' }}>
          <Button
            style={{ marginRight: '1rem' }}
            disabled={confirmLoading}
            onClick={handleCancel}
          >
            Hủy
          </Button>
          <Button type='primary' loading={confirmLoading} htmlType='submit'>
            {!edit ? ' Thêm' : 'Lưu'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default TypeAddForm;
