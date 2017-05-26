import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from '../constants';

const initialState = {
  status: false,
  data: {},
};

const authentication = function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        status: action.response.success, data: action.response,
      };

    case LOGIN_FAILURE:
    case SIGNUP_FAILURE:
      return {
        status: false, data: action.response,
      };
    default:
      return state;
  }
};
export default authentication;
