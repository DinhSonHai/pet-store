/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Banner from "./banner";
import Vision from "./vision";
import Categories from "./categories";
import CustomerReview from "./customer_review";
import CustomerExperience from "./experience";
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
      <ShowHomeProducts type="bestseller" products={bestsellerProducts} />
      <ShowHomeProducts type="popular" products={popularProducts} />
      <ShowHomeProducts type="newest" products={newestProducts} />
      <CustomerReview />
      <CustomerExperience />
    </section>
  );
}

const mapStateToProps = (state) => ({
  data: state.products,
});

export default connect(mapStateToProps, { getShowHomeProducts })(Home);
