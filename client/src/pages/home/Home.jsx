import { Layout } from 'antd';
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

const { Content } = Layout;

function Home(props) {
  return (
    <Content className='home'>
      <Banner />
      <Vision />
      <AboutUs />
      <Achivements />
      <Category />
      <Services />
      <Customer />
      <Experience />
    </Content>
  );
}

export default Home;
