import {
  GET_USERS,
} from '../constants';

const initialState = {
  userList: [],
};

const users = function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS: {
      let list
      if(typeof action.response.success !== 'undefined' && action.response.success === false)
        list = []
      else list = action.response
      return {
          userList: list
      };
    }
    default:
      return state;
  }
};
export default users;
