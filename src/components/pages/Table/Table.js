import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import SingleTable from '../../features/SingleTable/SingleTable';
import Load from '../../views/Load/Load';

import { getTableById } from '../../../redux/tablesRedux';
import TablesList from '../../features/TablesList/TablesList';



const Table = ({ pending }) => {
  const { id } = useParams();

  const table = useSelector(state => getTableById(state, id));

  if(!table) return <Navigate to={"/"} />
  return (
    <>
      {pending && <Load />}
      {!pending && <SingleTable table={table} id={id} />} 
    </>
  );
};

TablesList.propTypes = {
  pending: PropTypes.bool,
};

export default Table;