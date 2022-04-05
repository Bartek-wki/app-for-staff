import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

import { getTableById } from '../../../redux/tablesRedux';

import styles from './SingleTable.module.scss';
import { Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'

const SingleTable = () => {
  const { id } = useParams();
  const table = useSelector(state => getTableById(state, id));

  const [status, setStatus] = useState(table.status);

  return (
    <Row>
      <Col xs={12}>
        <h1>Table {table.id}</h1>
      </Col>
      <Form>
        <Form.Group>
          <Form.Label>Status:</Form.Label>
          <Form.Select aria-label="Status select" value={status} onChange={e => setStatus(e.target.value)}>
            <option value={'Free'}>Free</option>
            <option value={'Reserved'}>Reserved</option>
            <option value={'Busy'}>Busy</option>
            <option value={'Cleaning'}>Cleaning</option>
          </Form.Select>
        </Form.Group>
      </Form>
    </Row>
  );
};

export default SingleTable;