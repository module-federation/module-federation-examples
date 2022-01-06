import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { fetchCircuits } from './api';

export const initializeSession = () => ({
  type: 'INITIALIZE_SESSION',
});

const storeData = data => ({
  type: 'STORE_DATA',
  data,
});

export const fetchData = () => dispatch => fetchCircuits().then(res => dispatch(storeData(res)));

const sessionReducer = (state = false, action) => {
  switch (action.type) {
    case 'INITIALIZE_SESSION':
      return true;
    default:
      return state;
  }
};

const dataReducer = (state = [], action) => {
  switch (action.type) {
    case 'STORE_DATA':
      return action.data;
    default:
      return state;
  }
};

const reducer = combineReducers({
  loggedIn: sessionReducer,
  data: dataReducer,
});

export default initialState => createStore(reducer, initialState, applyMiddleware(thunkMiddleware));
