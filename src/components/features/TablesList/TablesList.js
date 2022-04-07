import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAllTables } from '../../../redux/tablesRedux';
import { removeTableRequest } from '../../../redux/tablesRedux';

import styles from './TablesList.module.scss';
import { Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const TablesList = () => {
  const dispatch = useDispatch();

  const tables = useSelector(state => getAllTables(state));

  const removeTable = id => {
    dispatch(removeTableRequest({ id }))
  };

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
            <Button className='mx-3' variant='danger' onClick={e => removeTable(table.id)}><FontAwesomeIcon icon={faTrash} /></Button>
            <Button variant='primary' as={Link} to={"/table/" + table.id}>Show more</Button>
          </Col>
        </Row>
      ))}
    </>
  );
};

export default TablesList;