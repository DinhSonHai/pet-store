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
            <h1 className='customer__name'>Đức Đào</h1>
            <p className='customer__text'>
              "Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos
              export minim fugiat minim velit minim dolor enim duis veniam ipsum
              anim magna sunt elit fore quem dolore labore illum veniam."
            </p>
          </div>
          <div className='customer__content'>
            <img src={Customer_02} alt='Alt' className='customer__avt' />
            <h1 className='customer__name'>Hải Ú Nù</h1>
            <p className='customer__text'>
              "Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos
              export minim fugiat minim velit minim dolor enim duis veniam ipsum
              anim magna sunt elit fore quem dolore labore illum veniam."
            </p>
          </div>
          <div className='customer__content'>
            <img src={Customer_03} alt='Alt' className='customer__avt' />
            <h1 className='customer__name'>Nam Gay</h1>
            <p className='customer__text'>
              "Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos
              export minim fugiat minim velit minim dolor enim duis veniam ipsum
              anim magna sunt elit fore quem dolore labore illum veniam."
            </p>
          </div>
          <div className='customer__content'>
            <img src={Customer_04} alt='Alt' className='customer__avt' />
            <h1 className='customer__name'>Kiên Bê Đê</h1>
            <p className='customer__text'>
              "Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos
              export minim fugiat minim velit minim dolor enim duis veniam ipsum
              anim magna sunt elit fore quem dolore labore illum veniam."
            </p>
          </div>
          <div className='customer__content'>
            <img src={Customer_05} alt='Alt' className='customer__avt' />
            <h1 className='customer__name'>Hòa Mad</h1>
            <p className='customer__text'>
              "Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos
              export minim fugiat minim velit minim dolor enim duis veniam ipsum
              anim magna sunt elit fore quem dolore labore illum veniam."
            </p>
          </div>
        </Carousel>
      </div>
    </section>
  );
};
export default CustomerReview;
