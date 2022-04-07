import { API_URL } from '../config';

//selectors
export const getAllTables = ({ tables }) => tables;
export const getTableById = ({ tables }, id) => tables.find(table => table.id === id);


// action names
const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const EDIT_TABLE = createActionName('EDIT_TABLE');
const ADD_TABLE = createActionName('ADD_TABLE');
const REMOVE_TABLE = createActionName('REMOVE_TABLE');

// action creators
export const updateTables = payload => ({ type: UPDATE_TABLES, payload });
export const editTable = payload => ({ type: EDIT_TABLE, payload });
export const addTable = payload => ({ type: ADD_TABLE, payload });
export const removeTable = payload => ({ type: REMOVE_TABLE, payload });
export const fetchTables = setPending => {
  return (dispatch) => {
    fetch(API_URL + '/tables')
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
export const editTableRequest = ({ id, status, peopleAmount, maxPeopleAmount, bill }) => {
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
    fetch(API_URL + '/tables/' + id, options)
      .then(() => dispatch(editTable({ id, status, peopleAmount, maxPeopleAmount, bill })))
  }
};
export const addTableRequest = (newTable) => {
  return (dispatch) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTable),
    };
    fetch(API_URL + '/tables', options)
      .then(() => dispatch(addTable(newTable)))
  }
};
export const removeTableRequest = ({ id }) => {
  return (dispatch) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    fetch(API_URL + '/tables/' + id, options)
      .then(() => dispatch(removeTable(id)))
  }
}


const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return [...action.payload]
    case EDIT_TABLE:
      return statePart.map(table => (table.id === action.payload.id ? { ...table, ...action.payload } : table));
    case ADD_TABLE: 
      return [...statePart, { ...action.payload }]
    case REMOVE_TABLE:
      return statePart.filter(table => table.id !== action.payload)
    default:
      return statePart;
  };
}

export default tablesReducer;