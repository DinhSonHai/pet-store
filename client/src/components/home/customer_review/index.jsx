/* eslint-disable import/no-anonymous-default-export */
import './styles.scss';
import Slider from 'infinite-react-carousel';
import Customer_01 from '../../../img/testimonials-1.jpg';
import Customer_02 from '../../../img/testimonials-2.jpg';
import Customer_03 from '../../../img/testimonials-3.jpg';
import Customer_04 from '../../../img/testimonials-4.jpg';
import Customer_05 from '../../../img/testimonials-5.jpg';

export default () => {
  const settings = {
    arrows: false,
    arrowsBlock: false,
    autoplay: true,
    dots: true,
    autoplaySpeed: 5000,
    adaptiveHeight: true,
  };
  return (
    <section className='customer'>
      <div className='customer__wrap container'>
        <Slider {...settings}>
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
        </Slider>
      </div>
    </section>
  );
};
