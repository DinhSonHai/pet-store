/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, Fragment } from 'react';
import { Form, Button, Input, Select, message } from 'antd';
import { ProgressBar } from '../../../components';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { connect } from 'react-redux';
import { createType, editType } from '../../../redux/actions/types';
import api from '../../../api';
const { Option } = Select;
const TypeAddForm = ({ createType, editType, edit, setEdit, item }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [content, setContent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [categoryState, setCategoryState] = useState([]);
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const types = ['image/png', 'image/jpeg', 'image/jpg'];
  useEffect(() => {
    if (edit) {
      form.resetFields();
      setContent(item.content);
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
    if (edit) {
      setConfirmLoading(true);
      await editType({ ...values, typeImg: images[0], content, id: item._id });
      setConfirmLoading(false);
      return;
    }
    setConfirmLoading(true);
    await createType({ ...values, typeImg: images[0], content });
    setConfirmLoading(false);
  };
  const handleCkeditor = (event, editor) => {
    let data = editor.getData();
    setContent(data);
  };
  return (
    <Fragment>
      <h3 style={{ textAlign: 'right' }}>
        {edit ? 'Sửa loại sản phẩm' : 'Thêm loại sản phẩm'}
      </h3>
      <Form
        encType='multipart/form-data'
        form={form}
        size='large'
        layout='vertical'
        onFinish={onFinish}
      >
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
        <Form.Item style={{ textAlign: 'center' }} label='Ảnh thumbnail'>
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
        <Form.Item>
          <CKEditor
            data={edit ? item.content : ''}
            config={{
              ckfinder: {
                uploadUrl: '/upload',
              },
              // toolbar: false,
            }}
            editor={ClassicEditor}
            onChange={handleCkeditor}
          />
        </Form.Item>
        <Form.Item style={{ textAlign: 'right' }}>
          {edit && (
            <Button
              style={{ marginRight: '1rem' }}
              onClick={() => {
                setContent('');
                setImages([]);
                setEdit(false);
              }}
            >
              Hủy
            </Button>
          )}

          <Button type='primary' loading={confirmLoading} htmlType='submit'>
            {edit ? 'Lưu' : ' Thêm'}
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
};
export default connect(null, { createType, editType })(TypeAddForm);
