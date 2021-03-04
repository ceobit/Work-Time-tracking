import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from '../types';

const initialState = {

};

export const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { registering: true };
    case REGISTER_SUCCESS:
      return {};
    case REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}