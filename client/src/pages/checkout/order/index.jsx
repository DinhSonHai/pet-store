import { Button, Card } from 'antd';
import { CaretLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const CheckoutOrder = ({ cartState, totalCart }) => {
  return (
    <Card
      title='Đơn hàng'
      extra={
        <div className='checkout__update-cart'>
          <CaretLeftOutlined />
          <Link to='/cart'>Sửa</Link>
        </div>
      }
    >
      <div className='checkout__products'>
        {cartState.map((item) => (
          <div key={item._id} className='checkout__products--content'>
            <img
              width='50'
              height='50'
              style={{ objectFit: 'cover' }}
              src={item.image}
              alt='Cart'
            />
            <div className='checkout__products--info'>
              <p className='checkout__products--name'>{item.productName}</p>
              <p className='checkout__products--price'>
                {parseInt(item.price).toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
                <span
                  className='checkout__products--amount'
                  style={{ margin: '0 1rem' }}
                >
                  {'x' + item.amount}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className='checkout__total'>
        <span>Tổng tiền: </span>
        <span id='checkout__total'>
          {parseInt(totalCart).toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          })}
        </span>
      </p>
      <Button form={'normal_checkout'} block type='primary' htmlType='submit'>
        Tiếp tục
      </Button>
    </Card>
  );
};
export default CheckoutOrder;
