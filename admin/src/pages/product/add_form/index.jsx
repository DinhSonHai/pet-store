/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, Fragment } from 'react';
import {
  Form,
  Button,
  Input,
  Select,
  Upload,
  Checkbox,
  InputNumber,
} from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { connect } from 'react-redux';
import { createProduct, editProduct } from '../../../redux/actions/products';
import { PlusOutlined } from '@ant-design/icons';
import { typeAPI } from '../../../api';
const { Option } = Select;
const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);
const ProductAddForm = ({
  createProduct,
  editProduct,
  edit,
  setEdit,
  item,
  tabChange,
  setTabChange,
}) => {
  let getIsShow = edit ? item.isShow : true;
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [content, setContent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [typeState, setTypeState] = useState([]);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(true);
  const [isShow, setIsShow] = useState(getIsShow);
  useEffect(() => {
    form.resetFields();
    if (edit) {
      setStatus(item.status);
      setImages(
        item.images.map((img, index) => ({
          uid: index,
          thumbUrl: img,
          response: { url: img },
        }))
      );
    } else {
      setStatus(true);
      setImages([]);
    }

    async function getTypes() {
      setIsProcessing(true);
      const res = await typeAPI.get_all_sell();
      setTypeState(res.data);
      setIsProcessing(false);
    }
    getTypes();
  }, [item, tabChange]);

  const onFinish = async (values) => {
    // if (images.length <= 0) {
    //   return message.error('Vui lòng chọn hình ảnh!');
    // }
    let result = false;
    setConfirmLoading(true);
    if (edit) {
      result = await editProduct(item._id, {
        ...values,
        description: content,
        status,
        isShow,
        images: images.map((img) => img.response.url),
      });
    } else {
      result = await createProduct({
        ...values,
        description: content,
        isShow,
        images: images.map((img) => img.response.url),
      });
    }
    setConfirmLoading(false);
    if (result) {
      setTabChange('list');
      edit && setEdit(false);
    }
  };

  const handleCkeditor = (event, editor) => {
    let data = editor.getData();
    setContent(data);
  };

  const handleChange = ({ fileList }) => {
    setImages(fileList);
  };

  function onChangeStatus(e) {
    setStatus(e.target.checked);
  }

  function onChangeShow(e) {
    setIsShow(e.target.checked);
  }
  
  return (
    <Fragment>
      <h3 style={{ textAlign: 'right' }}>
        {edit ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}
      </h3>
      <Form
        encType='multipart/form-data'
        form={form}
        size='large'
        layout='vertical'
        onFinish={onFinish}
      >
        <Form.Item
          initialValue={edit ? item.productName : ''}
          label='Tên SP'
          name='productName'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập Tên SP!',
            },
          ]}
        >
          <Input placeholder='Tên SP' />
        </Form.Item>
        <Form.Item
          initialValue={edit ? item.typeId._id : ''}
          label='Loại sản phẩm'
          name='typeId'
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn loại sản phẩm!',
            },
          ]}
        >
          <Select loading={isProcessing} disabled={isProcessing}>
            <Option value={''}>Chọn loại sản phẩm</Option>
            {typeState.map((ty) => (
              <Option key={ty._id} value={ty._id}>
                {ty.typeName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          style={{ width: '100%' }}
          rules={[
            {
              required: true,
              message: 'Vui lòng giá!',
            },
          ]}
          initialValue={edit ? item.price : ''}
          label='Đơn giá'
          name='price'
        >
          <InputNumber
            style={{ width: '100%' }}
            min={0}
            placeholder='Đơn giá'
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập số lượng',
            },
          ]}
          initialValue={edit ? item.quantity : ''}
          label='Số lượng'
          name='quantity'
        >
          <InputNumber
            style={{ width: '100%' }}
            min={0}
            placeholder='Số lượng'
          />
        </Form.Item>
        {edit && (
          <Form.Item label='Tình trạng'>
            <Checkbox onChange={onChangeStatus} checked={edit && status}>
              Còn hàng
            </Checkbox>
          </Form.Item>
        )}
        <Form.Item label='Hiển thị'>
          <Checkbox onChange={onChangeShow} checked={isShow}>
            Hiển thị bên người dùng
          </Checkbox>
        </Form.Item>
        <Form.Item label='Ảnh'>
          <Upload
            action='/uploadProduct'
            listType='picture-card'
            fileList={images}
            onChange={handleChange}
          >
            {images.length >= 8 ? null : uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item label='Mô tả'>
          <CKEditor
            data={item ? (content ? content : item.content) : content}
            config={{
              ckfinder: {
                uploadUrl: '/upload',
              },
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
export default connect(null, { createProduct, editProduct })(ProductAddForm);
