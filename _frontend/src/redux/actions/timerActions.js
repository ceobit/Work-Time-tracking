import {
  CREATE_DESCRIPTION,
  CREATE_DURATION,
  CREATE_TIME_START,
  CREATE_TIME_FINISH,
} from '../types';

const createDescription = (description) => ({
  type: CREATE_DESCRIPTION,
  description,
});
const createDuration = (duration) => ({ type: CREATE_DURATION, duration });
const createTimeStart = (time) => ({ type: CREATE_TIME_START, time });
const createTimeFinish = (time) => ({ type: CREATE_TIME_FINISH, time });

export const timerActions = {
  createDescription,
  createDuration,
  createTimeStart,
  createTimeFinish,
};
