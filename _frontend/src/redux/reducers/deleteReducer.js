import {
  DELETE_RECORDS_REQUEST,
  DELETE_RECORDS_REQUEST_SUCCESS,
  DELETE_RECORDS_REQUEST_FAILURE,
} from '../types';

const initialState = {
  sending: false,
};

export const deleteReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_RECORDS_REQUEST:
      return { ...state, sending: true };
    case DELETE_RECORDS_REQUEST_SUCCESS:
      return { ...state, sending: false };
    case DELETE_RECORDS_REQUEST_FAILURE:
      return { ...state, sending: false };
    default:
      return state;
  }
};
