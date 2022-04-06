//selectors
export const getAllTables = ({ tables }) => tables;
export const getTableById = ({ tables }, id) => tables.find(table => table.id === id);


// action names
const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const EDIT_TABLE = createActionName('EDIT_TABLE');

// action creators
export const updateTables = payload => ({ type: UPDATE_TABLES, payload });
export const editTable = payload => ({ type: EDIT_TABLE, payload });
export const fetchTables = setPending => {
  return (dispatch) => {
    fetch('http://localhost:3131/api/tables')
      .then(res => {
        if (res.status === 200) {
          return res.json()
            .then(tables => {
              dispatch(updateTables(tables));
              setPending(false);
          })
        }
      })
  }
};

export const editTableRequest = ({id, status, peopleAmount, maxPeopleAmount, bill}) => {
  return (dispatch) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        status: status,
        peopleAmount: peopleAmount,
        maxPeopleAmount: maxPeopleAmount,
        bill: bill
      }),
    };
    fetch('http://localhost:3131/tables/' + id, options)
      .then(() => dispatch(editTable({id, status, peopleAmount, maxPeopleAmount, bill})))
  }
}

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return [...action.payload]
    case EDIT_TABLE:
      return statePart.map(table => (table.id === action.payload.id ? { ...table, ...action.payload } : table));
    default:
      return statePart;
  };
}

export default tablesReducer;