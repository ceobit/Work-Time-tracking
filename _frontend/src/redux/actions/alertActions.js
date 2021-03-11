import { ALERT_CLEAR, ALERT_ERROR, ALERT_SUCCESS } from '../types';

const success = (message) => ({ type: ALERT_SUCCESS, message });
const error = (message) => ({ type: ALERT_ERROR, message });
const clear = (message) => ({ type: ALERT_CLEAR, message });

export const alertActions = {
  success,
  error,
  clear,
};
