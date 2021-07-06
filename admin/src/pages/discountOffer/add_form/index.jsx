/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from 'react';
import {
  Form,
  Button,
  Input,
  DatePicker,
  Select,
} from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';

import EditableTable from './components/EditableTable';
import { productAPI, typeAPI } from '../../../api';
import { createOffer, editOffer } from '../../../redux/actions/offers';

const { RangePicker } = DatePicker;
const { Option } = Select;

function OfferAddForm({
  edit,
  setEdit,
  item,
  createOffer,
  editOffer,
  tabChange,
  setTabChange,
}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [from, setFrom] = useState(Date.now());
  const [to, setTo] = useState(Date.now());
  const [typeOptions, setTypeOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [selectingType, setSelectingType] = useState(null);
  const [selectingProduct, setSelectingProduct] = useState(null);
  const [productList, setProductList] = useState(item ? () => {
    const newProducts = item.products.map(product => ({ ...product.productId, discount: product.discount, discountPrice: product.productId.price * (100 - product.discount) /100 }));
    return newProducts;
  } : []);

  const onFinish = async (value) => {
    const { title } = value;
    if (!title || !from || !to || productList.length <= 0 || productList.find(product => !product.discount)) {
      return;
    }
    const data = productList.map(product => ({ productId: product._id, discount: product.discount }));
    setLoading(true);
    let result = false;
    if (edit && item) {
      result = await editOffer(item._id, { title, from, to, data });
    } else {
      result = await createOffer({ title, from, to, data });
    }
    setLoading(false);
    if (result) {
      resetData();
      setTabChange('list');
      edit && setEdit(false);
    }
  };

  const resetData = () => {
    setSelectingProduct(null);
    setSelectingType(null);
    setFrom(Date.now());
    setTo(Date.now());
    setProductList([]);
    form.resetFields();
    setTypeOptions([]);
    setProductOptions([]);
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
    setSelectingProduct(null);
    const type = typeOptions.find(item => item._id === value);
    if (!type) {
      return;
    }
    setSelectingType(type);
    setIsProcessing(false);
  };

  const handleProductChange = (value) => {
    if (!value) {
      return;
    }
    const product = productOptions.find(item => item._id === value);
    if (!product) {
      return;
    }
    setSelectingProduct(product);
  };

  const handleSelectProduct = () => {
    if (!selectingProduct) return;
    const currentProduct = selectingProduct;
    const currentProductList = [...productList];
    const existProduct = currentProductList.find(product => product._id === currentProduct._id);
    if (existProduct) {
      return;
    }
    currentProductList.push(currentProduct);
    setProductList(currentProductList);
  };

  const shouldDisabledButton = () => {
    return productList.length <= 0 || productList.some(product => !product.discount) || !from || !to;
  };

  useEffect(() => {
    if (edit) {
      setFrom(Date.parse(item.from));
      setTo(Date.parse(item.to));
    }
    else {
      resetData();
    }

    async function getType() {
      setIsProcessing(true);
      const res = await typeAPI.get_all_sell();
      setTypeOptions(res.data);
      setIsProcessing(false);
    };

    getType();
  }, [item, tabChange]);

  return (
    <Fragment>
      <div className="header">
        <h2>
          {edit ? 'Sửa khuyến mãi' : 'Thêm khuyến mãi'}
        </h2>
        {item && (
          <h3 className={item.isActive ? "active" : "deactive"}>
            {item.isActive ? "Đang hoạt động" : "Không hoạt động"}
          </h3>
        )}
      </div>
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
          <p><span className="asterisk">*</span> Thời gian khuyến mãi</p>
          <RangePicker
            defaultValue={edit ? [moment(item.from), moment(item.to)] : []}
            value={[moment(from), moment(to)]}
            placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            onChange={onDateChange}
          />
        </div>
        <p style={{ marginTop: '28px' }}><span className="asterisk">*</span> Chọn sản phẩm</p>
        <div className="product-container">
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
            value={selectingType ? selectingType._id : ""}
          >
            <Option value={""}>Chọn danh mục</Option>
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
            disabled={productOptions.length <= 0}
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
            value={selectingProduct ? selectingProduct._id : ""}
          >
            <Option value={""}>Chọn sản phẩm</Option>
            {productOptions.map((product) => (
              <Option
                key={product._id}
                value={product._id}
              >
                {product.productName}
              </Option>
            ))}
          </Select>
          <Button onClick={handleSelectProduct} type="default" disabled={!selectingProduct}>Xác nhận</Button>
        </div>
        {productList.length > 0 && <EditableTable dataSource={productList} setDataSource={setProductList} />}
        <Form.Item style={{ textAlign: 'right', marginTop: '24px' }}>
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
          <Button type='primary' loading={loading} htmlType='submit' disabled={shouldDisabledButton()}>
            {edit ? 'Cập nhật khuyến mãi' : ' Thêm khuyến mãi'}
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
}

export default connect(null, { createOffer, editOffer })(OfferAddForm);
