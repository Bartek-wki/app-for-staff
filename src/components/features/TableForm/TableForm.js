import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';


import { getAllTables } from '../../../redux/tablesRedux';


import styles from './TableForm.module.scss';
import { Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'


const TableForm = ({ table, action, button }) => {
  let navigate = useNavigate();
  const tables = useSelector(state => getAllTables(state));

  const [id, setId] = useState('');
  const [status, setStatus] = useState('Busy');
  const [peopleAmount, setPeopleAmount] = useState(0);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(4);
  const [bill, setBill] = useState(0);

  useEffect(() => {
    if (table !== undefined) {
      setId(table.id);
      setStatus(table.status);
      setPeopleAmount(table.peopleAmount);
      setMaxPeopleAmount(table.maxPeopleAmount);
      setBill(table.bill);
    }    
  },[table])


  const handleSubmit = e => {
    e.preventDefault();
    action({id, status, peopleAmount, maxPeopleAmount, bill})
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

  const changeId = inputId => {
      setId(inputId);
  }

  const checkIdExist = () => {
    const isExist = tables.find(table => table.id === id);
    if (isExist !== undefined) {
      setId('')
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
        <h1>Table {id}</h1>
      </Col>
      <Form onSubmit={handleSubmit}>
        {table === undefined &&
          <Form.Group className='d-flex align-items-center mb-3'>
            <Col xs={1}>
              <Form.Label><strong>Id:</strong></Form.Label>
            </Col>
            <div className={styles.inputWrapper}>
              <Form.Control value={id}
                onChange={e => changeId(e.target.value)}
                onBlur={e => checkIdExist()} />
            </div>
          </Form.Group>
        }
        <Form.Group className='d-flex align-items-center mb-3'>
          <Col xs={1}>
            <Form.Label><strong>Status:</strong></Form.Label>
          </Col>
          <Col xs={3}>
            <Form.Select
              aria-label="Status select"
              value={status}
              onChange={e => changeStatus(e.target.value)}>
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
            <Form.Control
              value={peopleAmount}
              onChange={e => changePeopleAmount(e.target.value)}
              onBlur={e => checkPeopleAmount(e.target.value)} />
          </div>
          <span> / </span> 
          <div className={styles.inputWrapper}>
            <Form.Control
              value={maxPeopleAmount}
              onChange={e => changeMaxPeopleAmount(e.target.value)}
              onBlur={e => checkMaxPeopleAmount(e.target.value)} />
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
          {button}
        </Button>
      </Form>
    </Row>
  );
};

TableForm.propTypes = {
  table: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string,
      status: PropTypes.number,
      peopleAmount: PropTypes.number,
      maxPeopleAmount: PropTypes.number,
      bill: PropTypes.number
    })
  ),
  action: PropTypes.func,
  button: PropTypes.string,
}

export default TableForm;