import {
  RECORD_FAILURE,
  RECORD_REQUEST,
  RECORD_SUCCESS,
  GET_RECORDS_REQUEST,
  GET_RECORDS_REQUEST_SUCCESS,
  GET_RECORDS_REQUEST_FAILURE
} from '../types';
import { alertActions } from './alertActions';
import { http } from '../../http';

const createRecord = record => {

  const request = () => ({ type: RECORD_REQUEST});
  const success = records => ({ type: RECORD_SUCCESS, records });
  const fail = error => ({ type: RECORD_FAILURE, error });

  return dispatch => {
    dispatch(request());

    return http.createRecord(record)
    .then(
      record => {
        dispatch(success(record.data));
      },
      error => {
        dispatch(fail(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

const getRecords = () => {

  const request = () => ({ type: GET_RECORDS_REQUEST });
  const success = records => ({ type: GET_RECORDS_REQUEST_SUCCESS, records });
  const fail = error => ({ type: GET_RECORDS_REQUEST_FAILURE, error });

  return dispatch => {
    dispatch(request());

    http.getRecords()
    .then(
      records => {
        dispatch(success(records.data));
      },
      error => {
        dispatch(fail(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

export const recordActions = {
  createRecord,
  getRecords
}