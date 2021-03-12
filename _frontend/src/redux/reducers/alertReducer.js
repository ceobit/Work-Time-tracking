import { ALERT_CLEAR, ALERT_ERROR, ALERT_SUCCESS } from '../types';

export const alertReducer = (state = {}, action) => {
  switch (action.type) {
    case ALERT_SUCCESS:
      return {
        type: 'alert-success',
        message: action.message,
      };
    case ALERT_ERROR:
      return {
        type: 'alert-danger',
        message: action.message,
      };
    case ALERT_CLEAR:
      return {};
    default:
      return state;
  }
};
