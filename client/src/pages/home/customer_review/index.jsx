/* eslint-disable import/no-anonymous-default-export */
import './styles.scss';
import { Carousel } from 'antd';
import Customer_01 from '../../../assets/img/testimonials-1.jpg';
import Customer_02 from '../../../assets/img/testimonials-2.jpg';
import Customer_03 from '../../../assets/img/testimonials-3.jpg';
import Customer_04 from '../../../assets/img/testimonials-4.jpg';
import Customer_05 from '../../../assets/img/testimonials-5.jpg';

const CustomerReview = () => {
  return (
    <section className='customer'>
      <div className='customer__wrap container'>
        <Carousel infinite draggable autoplay>
          <div className='customer__content'>
            <img src={Customer_01} alt='Alt' className='customer__avt' />
            <h1 className='customer__name'>Đức Đào</h1>
            <p className='customer__text'>
              "Từ ngày mua thức ăn cho mèo ở đây, mèo nhà mình ăn nhiều hơn hẳn. Ủng hộ shop nhiệt tình!!!"
            </p>
          </div>
          <div className='customer__content'>
            <img src={Customer_02} alt='Alt' className='customer__avt' />
            <h1 className='customer__name'>Nhã Trúc</h1>
            <p className='customer__text'>
              "Trang web có nhiều tin tức hay và bổ ích về thú cưng. Không biết các bạn có nhận người viết content không? Mình sẽ support hết mình."
            </p>
          </div>
          <div className='customer__content'>
            <img src={Customer_03} alt='Alt' className='customer__avt' />
            <h1 className='customer__name'>Trung Kiên</h1>
            <p className='customer__text'>
              "Shop có các chương trình khuyến mãi hợp lý làm mình mua liên tục."
            </p>
          </div>
          <div className='customer__content'>
            <img src={Customer_05} alt='Alt' className='customer__avt' />
            <h1 className='customer__name'>Sơn Hải</h1>
            <p className='customer__text'>
              "Sản phẩm chất lượng tốt, shop chất lượng cao. Sẽ tiếp tục ủng hộ shop."
            </p>
          </div>
        </Carousel>
      </div>
    </section>
  );
};
export default CustomerReview;
