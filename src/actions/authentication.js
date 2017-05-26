import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from '../constants';

import endpoints from '../endpoints/authentication';
import callApi from '../util/apiCaller';

function sendResult (type, response) {
  return {
    type,
    response,
  };
}

export default function login (data) {
  return dispatch => {
    return callApi({
        path: endpoints.login.path,
        method: endpoints.login.method,
        body: data,
      }
    )
      .then((response) => {
          dispatch(sendResult(LOGIN_SUCCESS, response));
      }).catch(error => {
        dispatch(sendResult(LOGIN_FAILURE, error));
      });
  };
}

export function signUp (data) {
  return dispatch => {
    return callApi({
        path: endpoints.signup.path,
        method: endpoints.signup.method,
        body: data,
      }
    ).then((response) => {
      dispatch(sendResult(SIGNUP_SUCCESS, response));
    }).catch(error => {
      dispatch(sendResult(SIGNUP_FAILURE, error));
    });
  };
}
