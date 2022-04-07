import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { editTableRequest } from '../../../redux/tablesRedux';

import TableForm from '../TableForm/TableForm';


const SingleTable = ({table}) => {
  const dispatch = useDispatch();

  const editTable = ({id, status, peopleAmount, maxPeopleAmount, bill }) => {
    dispatch(editTableRequest({id, status, peopleAmount, maxPeopleAmount, bill }));
  }

    
  return (
    <TableForm table={table} action={editTable} button={'Update'} />
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
}

export default SingleTable;