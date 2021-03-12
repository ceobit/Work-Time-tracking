import {
  DELETE_RECORDS_REQUEST,
  DELETE_RECORDS_REQUEST_FAILURE,
  DELETE_RECORDS_REQUEST_SUCCESS,
  GET_FILTERED_RECORDS,
  GET_RECORDS_REQUEST,
  GET_RECORDS_REQUEST_FAILURE,
  GET_RECORDS_REQUEST_SUCCESS,
  RECORD_FAILURE,
  RECORD_REQUEST,
  RECORD_SUCCESS,
  RESET_FILTERED_RECORDS,
  RESET_RECORDS,
  SORT_RECORDS,
  UPDATE_RECORDS_REQUEST,
  UPDATE_RECORDS_REQUEST_FAILURE,
  UPDATE_RECORDS_REQUEST_SUCCESS,
} from '../types';
import { alertActions } from './alertActions';
import { http } from '../../http';
import { checkDate } from '../../aux';

const createRecord = (record) => {
  const request = () => ({ type: RECORD_REQUEST });
  const success = (records) => ({ type: RECORD_SUCCESS, records });
  const fail = (error) => ({ type: RECORD_FAILURE, error });

  return (dispatch) => {
    dispatch(request());

    return http.createRecord(record).then(
      (record) => {
        dispatch(success(record.data));
      },
      (error) => {
        dispatch(fail(error.toString()));
        dispatch(alertActions.error(error.toString()));
      },
    );
  };
};

const getRecords = () => {
  const byField = (field) => (a, b) => (Date.parse(a[field]) < Date.parse(b[field]) ? 1 : -1);

  const request = () => ({ type: GET_RECORDS_REQUEST });
  const success = (records) => ({ type: GET_RECORDS_REQUEST_SUCCESS, records });
  const fail = (error) => ({ type: GET_RECORDS_REQUEST_FAILURE, error });

  return (dispatch) => {
    dispatch(request());

    return http.getRecords().then(
      (records) => {
        dispatch(success(records.data.sort(byField('created_at'))));
      },
      (error) => {
        dispatch(fail(error.toString()));
        dispatch(alertActions.error(error.toString()));
      },
    );
  };
};

const deleteRecord = (recordId) => {
  const request = () => ({ type: DELETE_RECORDS_REQUEST });
  const success = (record) => ({
    type: DELETE_RECORDS_REQUEST_SUCCESS,
    record,
  });
  const fail = (error) => ({ type: DELETE_RECORDS_REQUEST_FAILURE, error });

  return (dispatch) => {
    dispatch(request());

    return http.deleteRecords(recordId).then(
      (records) => {
        dispatch(success(records.data));
      },
      (error) => {
        dispatch(fail(error.toString()));
        dispatch(alertActions.error(error.toString()));
      },
    );
  };
};

const updateRecord = (recordId, description) => {
  const request = () => ({ type: UPDATE_RECORDS_REQUEST });
  const success = (records) => ({
    type: UPDATE_RECORDS_REQUEST_SUCCESS,
    records,
  });
  const fail = (error) => ({ type: UPDATE_RECORDS_REQUEST_FAILURE, error });

  return (dispatch) => {
    dispatch(request());

    return http.updateRecords(recordId, description).then(
      (record) => {
        dispatch(success(record.data));
      },
      (error) => {
        dispatch(fail(error.toString()));
        dispatch(alertActions.error(error.toString()));
      },
    );
  };
};

const getFilterRecords = (dateFrom, dateTo, records) => {
  const arr = records.filter((el) => checkDate(el, dateFrom, dateTo));
  return { type: GET_FILTERED_RECORDS, records: arr };
};

const resetFilter = () => ({ type: RESET_FILTERED_RECORDS });
const resetRecords = () => ({ type: RESET_RECORDS });

const sortRecords = (isSorted, records) => {
  const byField = (field) => (isSorted
    ? (a, b) => (Date.parse(a[field]) < Date.parse(b[field]) ? 1 : -1)
    : (a, b) => (Date.parse(a[field]) > Date.parse(b[field]) ? 1 : -1));

  const arr = [...records];

  arr.sort(byField('created_at'));
  return { type: SORT_RECORDS, records: arr };
};

export const recordActions = {
  createRecord,
  getRecords,
  deleteRecord,
  updateRecord,
  getFilterRecords,
  resetFilter,
  resetRecords,
  sortRecords,
};
