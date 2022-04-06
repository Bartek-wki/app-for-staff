import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAllTables } from '../../../redux/tablesRedux';

import styles from './TablesList.module.scss';
import { Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


const TablesList = () => {
  const tables = useSelector(state => getAllTables(state));

  return (
    <>
      {tables.map(table => (
        <Row key={table.id} className={styles.tableWrapper + ' mb-4'}>
          <Col xs={2}>
            <h3>Table {table.id}</h3>
          </Col>
          <Col className='d-flex align-items-center'>
            <p className='mb-0'><strong>Status: </strong>{table.status}</p>
          </Col>
          <Col className='d-flex justify-content-end'>
            <Button variant='primary' as={Link} to={"/table/" + table.id}>Show more</Button>
          </Col>
        </Row>
      ))}
    </>
  );
};

export default TablesList;