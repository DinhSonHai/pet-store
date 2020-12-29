import { useState, useEffect, Fragment } from 'react';
import { Card, Rate, Button } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GetFavorite, UpdateFavorite } from '../../../redux/actions/auth';
import { Link } from 'react-router-dom';
import { Loader } from '../../../components';
import './styles.scss';
const WishList = ({ GetFavorite, UpdateFavorite }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  useEffect(() => {
    let flag = true;
    async function getProducts() {
      setIsLoading(true);
      const res = await GetFavorite();
      if (res && flag) {
        setData(res);
      }
      setIsLoading(false);
    }
    getProducts();
    return () => (flag = false);
  }, [GetFavorite]);
  const handleUnFavorite = async (id) => {
    setIsProcessing(true);
    const updatedData = data.filter((item) => item._id !== id);
    setData(updatedData);
    await UpdateFavorite(id);
    setIsProcessing(false);
  };
  return (
    <Fragment>
      <h3 className='profile__title'>Sản phẩm yêu thích({data.length})</h3>
      <div className='profile__main--wishlist'>
        {!data || isLoading ? (
          <Loader className={'wishlist-loader'} />
        ) : (
          data.map((item) => (
            <Card style={{ marginBottom: '0.5rem' }} key={item._id}>
              <div className='profile__main--wishlist-wrap'>
                <img
                  src={item.image}
                  width='100'
                  height='100'
                  style={{ objectFit: 'cover' }}
                  alt='product'
                />
                <div className='profile__main--wishlist-content'>
                  <p className='profile__main--wishlist-name'>
                    <Link to={`/pet/${item._id}`}>{item.productName}</Link>
                  </p>
                  <div className='profile__main--wishlist-rate'>
                    <Rate
                      style={{ fontSize: '0.8rem' }}
                      disabled
                      defaultValue={item.starRatings}
                    />
                  </div>
                  <p className='profile__main--wishlist-price'>
                    {parseInt(item.price).toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </p>
                  <Button
                    disabled={isProcessing}
                    onClick={() => handleUnFavorite(item._id)}
                    type='text'
                    danger
                  >
                    Xóa
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </Fragment>
  );
};
WishList.propTypes = {
  GetFavorite: PropTypes.func.isRequired,
  UpdateFavorite: PropTypes.func.isRequired,
};
export default connect(null, { GetFavorite, UpdateFavorite })(WishList);
