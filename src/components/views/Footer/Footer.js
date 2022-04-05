import styles from './Footer.module.scss';

import { Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <Row>
      <Col className='d-flex justify-content-center'>
        Copyright © PizzeriaApp 2022
      </Col>
    </Row>
  );
};

export default Footer;