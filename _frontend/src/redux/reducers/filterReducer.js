import {
  GET_FILTERED_RECORDS,
  RESET_FILTERED_RECORDS,
  SORT_RECORDS,
} from '../types';

const initialState = {
  records: [],
};

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FILTERED_RECORDS:
      return { ...state, records: action.records };
    case RESET_FILTERED_RECORDS:
      return { ...state, records: [] };
    case SORT_RECORDS:
      return { ...state, records: action.records };
    default:
      return state;
  }
};
