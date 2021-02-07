import {
  Banner,
  Vision,
  AboutUs,
  Achivements,
  Services,
  Customer,
  Experience,
  Category,
} from '../../components';
import './styles.scss';

function Home(props) {
  return (
    <section className='home'>
      <Banner />
      <Vision />
      <AboutUs />
      <Achivements />
      <Category />
      <Services />
      <Customer />
      <Experience />
    </section>
  );
}

export default Home;
