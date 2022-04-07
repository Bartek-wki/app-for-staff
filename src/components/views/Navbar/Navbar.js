import { Link } from 'react-router-dom';

import styles from './Navbar.module.scss';

import { Row, Col } from 'react-bootstrap';

const Navbar = () => {
  return (
    <Row className={styles.navbarWrapper + ' mb-4'}>
      <Col className='d-flex justify-content-start align-items-center'>
        <h5>Waiter.app</h5>
      </Col>
      <Col className='d-flex justify-content-end align-items-center'>
        <Link to={'/add'}>
          Add table
        </Link>
        <Link to={'/'}>
          Home
        </Link>
      </Col>
    </Row>
  );
};

export default Navbar;