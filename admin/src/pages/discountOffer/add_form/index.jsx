import React, { Fragment, useEffect, useState } from 'react';
import {
  Form,
  Button,
  Input,
  DatePicker,
  Select,
} from 'antd';
import moment from 'moment';

import { productAPI, typeAPI } from '../../../api';

const { RangePicker } = DatePicker;
const { Option } = Select;

function OfferAddForm({
  edit,
  setEdit,
  item,
}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [typeOptions, setTypeOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [selectingProduct, setSelectingProduct] = useState({});

  const onFinish = async (value) => {
    console.log(value);
  };

  const onDateChange = (value, dateString) => {
    if (dateString.length < 2) {
      return;
    }
    setFrom(Date.parse(dateString[0]));
    setTo(Date.parse(dateString[1]));
  };

  const handleTypeChange = async (value) => {
    if (!value) {
      return;
    }
    setIsProcessing(true);
    const res = await productAPI.get_by_type(value);
    setProductOptions(res.data);
    setIsProcessing(false);
  };

  const handleProductChange = (value) => {
    const product = productOptions.find(item => item._id === value);
    if (!product) {
      return;
    }
    setSelectingProduct(product);
  };

  const handleSelectProduct = () => {
    console.log(selectingProduct)
  };

  useEffect(() => {
    if (edit) {
      form.resetFields();
    };

    async function getType() {
      setIsProcessing(true);
      const res = await typeAPI.get_all_sell();
      setTypeOptions(res.data);
      setIsProcessing(false);
    };

    getType();
  }, [item]);

  return (
    <Fragment>
      <h3 style={{ textAlign: 'right' }}>
        {edit ? 'Sửa khuyến mãi' : 'Thêm khuyến mãi'}
      </h3>
      <Form
        form={form}
        size='large'
        layout='vertical'
        onFinish={onFinish}
      >
        <Form.Item
          initialValue={edit ? item.title : ''}
          label='Tiêu đề khuyến mãi'
          name='title'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tiêu đề khuyến mãi!',
            },
          ]}
        >
          <Input placeholder='Tiêu đề' />
        </Form.Item>
        <div>
          <p>Thời gian khuyến mãi</p>
          <RangePicker
            defaultValue={edit ? [moment(item.from), moment(item.to)] : []}
            placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            onChange={onDateChange}
          />
        </div>
        <p style={{ marginTop: '28px' }}>Chọn sản phẩm</p>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Select
            showSearch
            loading={isProcessing}
            style={{ width: '30%', marginRight: '12px' }}
            mode="single"
            placeholder="Chọn danh mục"
            onChange={handleTypeChange}
            optionFilterProp="children"
            filterOption={(input, option) =>  
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {typeOptions.map((type) => (
              <Option
                key={type._id}
                value={type._id}
              >
                {type.typeName}
              </Option>
            ))}
          </Select>
          <Select
            showSearch
            loading={isProcessing}
            style={{ width: '60%', marginRight: '12px' }}
            mode="single"
            placeholder="Chọn sản phẩm"
            onChange={handleProductChange}
            optionFilterProp="children"
            filterOption={(input, option) =>  
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {productOptions.map((product) => (
              <Option
                key={product._id}
                value={product._id}
              >
                {product.productName}
              </Option>
            ))}
          </Select>
          <Button onClick={handleSelectProduct} type="default">Xác nhận</Button>
        </div>
        <Form.Item style={{ textAlign: 'right' }}>
          {edit && (
            <Button
              style={{ marginRight: '1rem' }}
              onClick={() => {
                setEdit(false);
              }}
            >
              Hủy
            </Button>
          )}
          <Button type='primary' loading={loading} htmlType='submit'>
            {edit ? 'Lưu' : ' Thêm'}
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
}

export default OfferAddForm;
