import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';

import { editTableRequest } from '../../../redux/tablesRedux';

import styles from './SingleTable.module.scss';
import { Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'

const SingleTable = ({table, id}) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [status, setStatus] = useState(table.status);
  const [peopleAmount, setPeopleAmount] = useState(parseInt(table.peopleAmount));
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(parseInt(table.maxPeopleAmount));
  const [bill, setBill] = useState(parseInt(table.bill));

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(editTableRequest({id, status, peopleAmount, maxPeopleAmount, bill }));
    navigate("/", { replace: true });
  }

  const changePeopleAmount = input => {
    const inputPeopleAmount = parseInt(input);

    if (!isNaN(inputPeopleAmount) && inputPeopleAmount < 0) {
      setPeopleAmount(0);
    } else if (!isNaN(inputPeopleAmount) && inputPeopleAmount > 10) {
      setPeopleAmount(10);
    }  else if (isNaN(inputPeopleAmount)) {
      setPeopleAmount(peopleAmount);
    } else {
      setPeopleAmount(inputPeopleAmount)
    }
  }

  const changeMaxPeopleAmount = input => {
    const inputMaxPeopleAmount = parseInt(input);

    if (!isNaN(inputMaxPeopleAmount) && inputMaxPeopleAmount < 0) {
      setMaxPeopleAmount(0);
    } else if (!isNaN(inputMaxPeopleAmount) && inputMaxPeopleAmount > 10) {
      setMaxPeopleAmount(10);
    } else if (isNaN(inputMaxPeopleAmount)) {
      setMaxPeopleAmount(maxPeopleAmount);
    } else {
      setMaxPeopleAmount(inputMaxPeopleAmount)
    }
  }

  const checkPeopleAmount = input => {
    const inputPeopleAmount = parseInt(input);

    if (!isNaN(inputPeopleAmount) && inputPeopleAmount > maxPeopleAmount) {
      setPeopleAmount(maxPeopleAmount);
    }
  }

  const checkMaxPeopleAmount = input => {
    const inputMaxPeopleAmount = parseInt(input);

    if (!isNaN(inputMaxPeopleAmount) && inputMaxPeopleAmount < peopleAmount) {
      setPeopleAmount(inputMaxPeopleAmount);
    }
  }

  const changeBill = input => {
    const inputBill = parseInt(input);

    if (!isNaN(inputBill)) {
      setBill(inputBill);
    }
  }

  const changeStatus = inputStatus => {
    setStatus(inputStatus)

    if (inputStatus === 'Busy') {
      setBill(0);
    }
    if (inputStatus === 'Free' || inputStatus === 'Cleaning') {
      setPeopleAmount(0)
    }
  }
    
  return (
    <Row>
      <Col xs={12}>
        <h1>Table {table.id}</h1>
      </Col>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='d-flex align-items-center mb-3'>
          <Col xs={1}>
            <Form.Label><strong>Status:</strong></Form.Label>
          </Col>
          <Col xs={3}>
            <Form.Select aria-label="Status select" value={status} onChange={e => changeStatus(e.target.value)}>
              <option value={'Free'}>Free</option>
              <option value={'Reserved'}>Reserved</option>
              <option value={'Busy'}>Busy</option>
              <option value={'Cleaning'}>Cleaning</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group className='d-flex align-items-center mb-3'>
          <Col xs={1}>
            <Form.Label><strong>People:</strong></Form.Label>
          </Col>
          <div className={styles.inputWrapper}>
            <Form.Control value={peopleAmount} onChange={e => changePeopleAmount(e.target.value)} onBlur={e => checkPeopleAmount(e.target.value)}/>
          </div>
          <span> / </span> 
          <div className={styles.inputWrapper}>
            <Form.Control value={maxPeopleAmount} onChange={e => changeMaxPeopleAmount(e.target.value)} onBlur={e => checkMaxPeopleAmount(e.target.value)}/>
          </div>
        </Form.Group>
        {status === 'Busy' &&
          <Form.Group className='d-flex align-items-center mb-3'>
            <Col xs={1}>
              <Form.Label><strong>Bill:</strong></Form.Label>
            </Col>
            <span>$</span>
            <div className={styles.inputWrapper}>
              <Form.Control value={bill} onChange={e => changeBill(e.target.value)} />
            </div>
          </Form.Group>
        }
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </Row>
  );
};

SingleTable.propTypes = {
  table: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string,
      status: PropTypes.number,
      peopleAmount: PropTypes.number,
      maxPeopleAmount: PropTypes.number,
      bill: PropTypes.number
    })
  ),
  id: PropTypes.string,
}

export default SingleTable;