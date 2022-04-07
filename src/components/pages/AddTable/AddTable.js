import PropTypes from 'prop-types';

import AddTableForm from "../../features/AddTableForm/AddTableForm";
import Load from "../../views/Load/Load";

import { Row, Col } from "react-bootstrap";


const AddTable = ({pending}) => {
  return (
    <Row>
      <Col xs={12} className='mb-2'>
        <h1>Add Table</h1>
      </Col>
      {pending && <Load />}
      {!pending && <AddTableForm />}
    </Row>
  );
};

AddTable.propTypes = {
  pending: PropTypes.bool,
};

export default AddTable;