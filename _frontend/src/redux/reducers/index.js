import { combineReducers } from 'redux';

import { authenticationReducer } from './authenticationReducer';
import { registrationReducer } from './registrationReducer';
import { timerReducer } from './timerReducer';
import {recordReducer} from './recordReducer';
import { alertReducer } from './alertReducer';
import {fetchReducer} from './fetchReducer';
import {deleteReducer} from './deleteReducer';
import {updateReducer} from './updateReducer';
import {filterReducer} from './filterReducer';

const rootReducer = combineReducers({
  registrationReducer,
  authenticationReducer,
  alertReducer,
  timer: timerReducer,
  fetched_records: fetchReducer,
  records: recordReducer,
  deleteRecord: deleteReducer,
  updateRecord: updateReducer,
  filter: filterReducer
});

export default rootReducer;