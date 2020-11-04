import { Layout, Button, Table, InputNumber } from 'antd';
import { Link } from 'react-router-dom';
import './styles.css';
const { Content } = Layout;

const columns = [
  {
    title: 'Ảnh',
    dataIndex: 'img',
    key: 'img',
    render: (imgSrc) => <img height='50' width='50' src={imgSrc} alt='alt' />,
  },
  {
    title: 'Tên sản phẩm',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <Link to='/'>{text}</Link>,
  },
  {
    title: 'Đơn giá',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity',
    key: 'quantity',
    render: (value) => <InputNumber min={1} max={10} value={value} />,
  },
  {
    title: 'Tạm tính',
    dataIndex: 'total',
    key: 'total',
  },
  {
    key: 'action',
    render: () => (
      <Button style={{ color: 'red' }} type='text'>
        Xóa
      </Button>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    price: parseInt(2000000).toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }),
    quantity: 2,
    total: parseInt(4000000).toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }),
    img: 'https://picsum.photos/260',
  },
  {
    key: '2',
    name: 'Jim Green',
    price: parseInt(5000000).toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }),
    quantity: 4,
    total: parseInt(20000000).toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }),
    img: 'https://picsum.photos/260',
  },
  {
    key: '3',
    name: 'Joe Black',
    price: parseInt(4000000).toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }),
    quantity: 1,
    total: parseInt(4000000).toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }),
    img: 'https://picsum.photos/260',
  },
];

export const CartHome = () => {
  return (
    <Content className='cartHome'>
      <section className='container'>
        <h1 className='cart-title'>Your cart</h1>
        <Table columns={columns} dataSource={data} />
      </section>
    </Content>
  );
};
