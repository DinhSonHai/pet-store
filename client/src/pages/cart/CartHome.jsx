/* eslint-disable import/no-anonymous-default-export */
import { useEffect, useState } from 'react';
import { Layout, Button, Table, InputNumber } from 'antd';
import { Link } from 'react-router-dom';
import './styles.scss';

const { Content } = Layout;

export default function () {
  const [data, setData] = useState([]);
  const [updateCart, setUpdateCart] = useState(false);
  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total_show = document.getElementById('cart__total');
    let total_value = cart.reduce((a, b) => a + b.price * b.amount, 0);
    total_show.textContent = parseInt(total_value).toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
    let newCart = [];
    newCart = cart.map((item) => {
      return {
        key: item._id,
        name: item,
        price: parseInt(item.price).toLocaleString('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }),
        amount: item,
        total: parseInt(item.price * item.amount).toLocaleString('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }),
        img: item.image,
      };
    });
    setData(newCart);
  }, [updateCart]);
  const setAmount = (_id, value) => {
    if (!value || isNaN(value) || !Number.isInteger(value)) {
      return;
    }
    let cart = JSON.parse(localStorage.getItem('cart'));
    let updatedCart = cart.map((item) => {
      return item._id === _id ? { ...item, amount: value } : item;
    });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setUpdateCart(!updateCart);
  };

  const removeItem = (_id) => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    let count = document.getElementById('cart__count');
    let updatedCart = cart.filter((item) => {
      return item._id !== _id;
    });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setUpdateCart(!updateCart);
    count.textContent = updatedCart.length;
  };
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
      render: (item) => <Link to={`/pet/${item._id}`}>{item.productName}</Link>,
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Số lượng',
      dataIndex: 'amount',
      key: 'amount',
      render: (item) => (
        <InputNumber
          onChange={(value) => {
            setAmount(item._id, value);
          }}
          min={1}
          value={item.amount}
        />
      ),
    },
    {
      title: 'Tạm tính',
      dataIndex: 'total',
      key: 'total',
    },
    {
      key: 'action',
      dataIndex: 'key',
      render: (_id) => (
        <Button
          onClick={() => removeItem(_id)}
          style={{ color: 'red' }}
          type='text'
        >
          Xóa
        </Button>
      ),
    },
  ];
  return (
    <Content className='cart'>
      <section className='container'>
        <h1 className='cart__title'>Your cart</h1>
        {/* set loading={true} for table if user loged in */}
        <Table columns={columns} dataSource={data} />
        <div className='cart__total'>
          Tổng tiền: <span id='cart__total'>0</span>
        </div>
      </section>
    </Content>
  );
}
