import { useState } from 'react';
import { Button, notification, message } from 'antd';
import { Heart, HeartFill } from '../../icons';
import { connect } from 'react-redux';
import { UpdateFavorite } from '../../redux/actions/auth';

const FavoriteAction = ({
  data,
  favoriteState,
  isAuthenticated,
  UpdateFavorite,
}) => {
  const [isFavorite, setIsFavorite] = useState(favoriteState);
  const [isProcessing, setIsProcessing] = useState(false);
  const handleClick = async (productId) => {
    if (!isAuthenticated) {
      return notification.open({
        message: 'Thông báo!',
        description: 'Bạn cần đăng nhập để thực hiện thao tác này!',
      });
    }
    if (!productId) {
      return;
    }
    setIsProcessing(true);
    const res = await UpdateFavorite(productId);
    if (!res) {
      message.success('Đã thêm sản phẩm vào mục yêu thích.');
    }
    setIsProcessing(false);
    if (isFavorite) {
      setIsFavorite(false);
      return;
    }
    setIsFavorite(true);
  };
  return (
    <Button
      loading={isProcessing}
      type='text'
      icon={isAuthenticated && isFavorite ? <HeartFill /> : <Heart />}
      onClick={() => handleClick(data._id)}
    />
  );
};
export default connect(null, { UpdateFavorite })(FavoriteAction);
