import { CREATE_DESCRIPTION, CREATE_DURATION, CREATE_TIME_START, CREATE_TIME_FINISH } from '../types';

const initialState = {
  description: '',
  duration: '',
  timeStart: '',
  timeFinish: ''
};

export const timerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_DESCRIPTION:
      return {...state, description: action.description}
    case CREATE_DURATION:
      return {...state, duration: action.duration}
    case CREATE_TIME_START:
      return {...state, timeStart: action.time}
    case CREATE_TIME_FINISH:
      return {...state, timeFinish: action.time}
    default:
      return state;
  }
}