import {
  GET_RECORDS_REQUEST,
  GET_RECORDS_REQUEST_SUCCESS,
  GET_RECORDS_REQUEST_FAILURE,
} from '../types';

const initialState = {
  records: [],
  sending: false,
};

export const fetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECORDS_REQUEST:
      return { ...state, sending: true };
    case GET_RECORDS_REQUEST_SUCCESS:
      return { ...state, records: action.records, sending: false };
    case GET_RECORDS_REQUEST_FAILURE:
      return { ...state, sending: false };
    default:
      return state;
  }
};
