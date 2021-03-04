import { combineReducers } from 'redux';

import { authenticationReducer } from './authenticationReducer';
import { registrationReducer } from './registrationReducer';
// import { users } from './users.reducer';
import { alertReducer } from './alertReducer';

const rootReducer = combineReducers({
  registrationReducer,
  authenticationReducer,
  alertReducer
});

export default rootReducer;