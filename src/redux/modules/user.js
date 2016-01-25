import { createAction, handleActions } from 'redux-actions';
import {config} from '../config';
import fetch from 'isomorphic-fetch';

export const LOAD_USER = 'LOAD_USER';

export const load = createAction(LOAD_USER);
export const loadUser = () => {
  return (dispatch, getState) => {
    fetch(config.http + 'api/users/abracadabra')
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        dispatch(load(data));
      });
  }
}

export const actions = {
  loadUser
}

export default handleActions({
  [LOAD_USER]: (state, action) => {
    if (action.payload) {
      return action.payload;
    } else {
      return state;
    }
  }
}, {
  username: 'Evgenii Onegin',
  photo: '',
  status: 'asdasd',
  online: {},
  stats: {
    visits: 2399,
    followers: 443,
    following: 234,
    posts: 3
  }
});
