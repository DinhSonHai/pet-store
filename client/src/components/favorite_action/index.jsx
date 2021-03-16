import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { notifyActions } from '../../utils/notify';
import { Heart, HeartFill } from '../../assets/icons';
import { connect } from 'react-redux';
import { updateFavorite } from '../../redux/actions/auth';

const FavoriteAction = ({
  data,
  favoriteState,
  isAuthenticated,
  updateFavorite,
}) => {
  const [isFavorite, setIsFavorite] = useState(favoriteState);
  const [isProcessing, setIsProcessing] = useState(false);
  useEffect(() => {
    setIsFavorite(favoriteState);
  }, [favoriteState]);
  const handleClick = async (productId) => {
    if (!isAuthenticated) {
      return notifyActions(
        'error',
        'Bạn cần đăng nhập để thực hiện thao tác này!'
      );
    }
    if (!productId) {
      return;
    }
    setIsProcessing(true);
    const res = await updateFavorite(productId);
    setIsProcessing(false);
    if (!res) {
      notifyActions('success', 'Đã thêm sản phẩm vào mục yêu thích.');
    }
    if (isFavorite) {
      setIsFavorite(false);
      return;
    }
    setIsFavorite(true);
  };
  return (
    <Button
      block
      style={{ height: '100%' }}
      loading={isProcessing}
      type='text'
      icon={isAuthenticated && isFavorite ? <HeartFill /> : <Heart />}
      onClick={() => handleClick(data._id)}
    />
  );
};
export default connect(null, { updateFavorite })(FavoriteAction);
