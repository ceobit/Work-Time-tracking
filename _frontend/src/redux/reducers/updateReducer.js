import {
  UPDATE_RECORDS_REQUEST,
  UPDATE_RECORDS_REQUEST_SUCCESS,
  DELETE_RECORDS_REQUEST_FAILURE,
} from '../types';

const initialState = {
  sending: false,
};

export const updateReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_RECORDS_REQUEST:
      return { ...state, sending: true };
    case UPDATE_RECORDS_REQUEST_SUCCESS:
      return { ...state, sending: false };
    case DELETE_RECORDS_REQUEST_FAILURE:
      return { ...state, sending: false };
    default:
      return state;
  }
};
