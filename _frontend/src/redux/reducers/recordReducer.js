import {
  GET_RECORDS_REQUEST,
  GET_RECORDS_REQUEST_SUCCESS,
  GET_RECORDS_REQUEST_FAILURE,
  RECORD_FAILURE,
  RECORD_REQUEST,
  RECORD_SUCCESS,
} from '../types';

const initialState = {
  sending: false,
};

export const recordReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECORD_REQUEST:
      return {...state, sending: true};
    case RECORD_SUCCESS:
      return { ...state, sending: false };
    case RECORD_FAILURE:
      return {...state, sending: false};
    default:
      return state;
  }
};