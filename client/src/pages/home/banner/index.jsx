/* eslint-disable import/no-anonymous-default-export */
import ImageGallery from "react-image-gallery";
import { bannerImages } from "../../../assets/banner";
import "./styles.scss";

// const bannerList = [
//   "https://petshopsaigon.vn/wp-content/uploads/2019/08/pet-shop-sai-gon-1.jpg",
//   "https://petshopsaigon.vn/wp-content/uploads/2019/08/pet-shop-sai-gon-2.jpg",
//   "https://petshopsaigon.vn/wp-content/uploads/2019/08/pet-shop-sai-gon-3.jpg",
//   "https://petshopsaigon.vn/wp-content/uploads/2019/08/pet-shop-sai-gon-4.jpg",
// ];

// const bannerListSide = [
//   "https://petshopsaigon.vn/wp-content/uploads/2020/06/thuc-an-cho-cho-banner.jpg",
//   "https://petshopsaigon.vn/wp-content/uploads/2020/06/thuc-an-cho-meo-banner.jpg",
//   "https://petshopsaigon.vn/wp-content/uploads/2020/06/cham-soc-cho-meo-banner.jpg",
//   "https://petshopsaigon.vn/wp-content/uploads/2020/06/suc-khoe-cho-meo-banner.jpg",
// ];
const Banner = () => {
  return (
    <section className="banner">
      <ImageGallery
        autoPlay
        showBullets
        showNav={false}
        showThumbnails={false}
        showFullscreenButton={false}
        showPlayButton={false}
        items={bannerImages.map((item) => ({
          original: item,
          thumbnail: item,
        }))}
      />
    </section>
  );
};
export default Banner;
