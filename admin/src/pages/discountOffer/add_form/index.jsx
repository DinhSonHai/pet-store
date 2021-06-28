import React, { Fragment, useState } from 'react';
import {
  Form,
  Button,
  Input,
  DatePicker,
  Select,
} from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Option } = Select;

function OfferAddForm({
  edit,
  setEdit,
  item,
}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [typeOptions, setTypeOptions] = useState([{ label: '123' , value: '321'}]);
  const [productOptions, setProductOptions] = useState([{ label: '123' , value: '321'}]);

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

  const handleTypeChange = (value) => {
    console.log(value);
  };

  const handleProductChange = (value) => {
    console.log(value);
  };

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
            defaultValue={[moment(item.from), moment(item.to)]}
            placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            onChange={onDateChange}
          />
        </div>
        <div style={{ marginTop: '24px' }}>
          <p>Chọn sản phẩm</p>
          <Select
            style={{ width: '30%', marginRight: '12px' }}
            mode="multiple"
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
            style={{ width: '50%', marginRight: '12px' }}
            mode="multiple"
            placeholder="Chọn sản phẩm"
            onChange={handleProductChange}
            options={typeOptions}
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
