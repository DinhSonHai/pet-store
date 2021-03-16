import Banner from './banner';
import Vision from './vision';
import Achivements from './achivements';
import Categories from './categories';
import About from './about_us';
import Services from './services';
import CustomerReview from './customer_review';
import CustomerExperience from './experience';
import './styles.scss';

function Home(props) {
  return (
    <section className='home'>
      <Banner />
      <Vision />
      <About />
      <Achivements />
      <Categories />
      <Services />
      <CustomerReview />
      <CustomerExperience />
    </section>
  );
}

export default Home;
