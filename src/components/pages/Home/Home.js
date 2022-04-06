import PropTypes from 'prop-types';

import { Row, Col } from 'react-bootstrap';

import TablesList from '../../features/TablesList/TablesList';
import Load from '../../views/Load/Load'


const Home = ({ pending }) => {

  return (
    <Row>
      <Col xs={12} className='mb-2'>
        <h1>All tables</h1>
      </Col>
      {pending && <Load />}
      {!pending && <TablesList />}
    </Row>
  );
};

Home.propTypes = {
  pending: PropTypes.bool,
};

export default Home;