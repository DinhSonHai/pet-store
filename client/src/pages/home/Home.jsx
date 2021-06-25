/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Banner from "./banner";
import Vision from "./vision";
import Categories from "./categories";
import CustomerReview from "./customer_review";
import CustomerExperience from "./experience";
import Contact from "./contact";
import { ShowHomeProducts } from "../../components";
import { getShowHomeProducts } from "../../redux/actions/products";
import { connect } from "react-redux";
import "./styles.scss";

function Home({
  getShowHomeProducts,
  data: { popularProducts, newestProducts, bestsellerProducts },
}) {
  useEffect(() => {
    async function getData() {
      await Promise.all([
        getShowHomeProducts("newest"),
        getShowHomeProducts("popular"),
        getShowHomeProducts(),
      ]);
    }
    getData();
  }, []);
  return (
    <section className="home">
      <Banner />
      <Vision />
      <Categories />
      <ShowHomeProducts type="newest" products={newestProducts} />
      <ShowHomeProducts type="bestseller" products={bestsellerProducts} />
      <ShowHomeProducts type="popular" products={popularProducts} />
      <CustomerReview />
      <CustomerExperience />
      <Contact />
    </section>
  );
}

const mapStateToProps = (state) => ({
  data: state.products,
});

export default connect(mapStateToProps, { getShowHomeProducts })(Home);
