import styles from './Home.module.scss';
import { Row, Col } from 'react-bootstrap';

import TablesList from '../../features/TablesList/TablesList';

const Home = () => {
  return (
    <Row>
      <Col xs={12} className='mb-2'>
        <h1>All tables</h1>
      </Col>
      <TablesList />
    </Row>
  );
};

export default Home;