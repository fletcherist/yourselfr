import { createAction, handleActions } from 'redux-actions';
import fetch from 'isomorphic-fetch';

export const LOAD_USER = 'LOAD_USER';

export const loadUser = createAction(LOAD_USER, (value = 1) => value);

export const actions = {
  loadUser
}

export default handleActions({
  [LOAD_USER]: (state, { payload }) => {
    return state;
  }
}, {
  username: 'Evgenii Onegin',
  photo: '',
  status: 'asdasd',
  online: {},
  stats: {
    visits: 2399,
    followers: 443,
    following: 234
  }
});
