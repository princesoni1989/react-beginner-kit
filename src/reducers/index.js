import { combineReducers } from 'redux';
import authentication from './authentication';
import users from './users';

const rootReducer = combineReducers({
  authentication,
  users,
});

export default rootReducer;
