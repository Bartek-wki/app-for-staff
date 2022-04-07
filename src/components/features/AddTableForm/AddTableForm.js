import TableForm from "../TableForm/TableForm";
import { useDispatch } from 'react-redux';

import { addTableRequest } from "../../../redux/tablesRedux";


const AddTableForm = () => {
  const dispatch = useDispatch();

  const addTable = ({ id, status, peopleAmount, maxPeopleAmount, bill }) => {
    dispatch(addTableRequest({id, status, peopleAmount, maxPeopleAmount, bill}))
  };

  return (
    <TableForm action={addTable} button={'Add table'}/>
  );
};

export default AddTableForm;