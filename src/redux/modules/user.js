import { createAction, handleActions } from 'redux-actions';
import fetch from 'isomorphic-fetch';
import { config } from '../config';

export const LOAD_USER = 'LOAD_USER';
export const UPDATE_POSTS_COUNTER = 'UPDATE_POSTS_COUNTER';

export const load = createAction(LOAD_USER, (value = 1) => value);
export const update = createAction(UPDATE_POSTS_COUNTER, (value = 1) => value);

export const loadUser = () => {
  console.log('loadUser');
  return (dispatch, getState) => {
    fetch(config.http + 'api/users/abracadabra')
      .then((r) => r.json())
      .then((data) => {
        dispatch(load(data));
      });
  }
}

export const actions = {
  loadUser
}

export default handleActions({
  LOAD_USER: (state, { payload }) => {
    return payload;
  },
  UPDATE_POSTS_COUNTER: (state, {payload}) => {
    console.log('adsad3333s')
    return {...state, ...{stats: {posts: payload}}};
  }
}, {
  username: 'username',
  photo: '',
  status: 'status',
  online: {},
  stats: {
    visits: 0,
    followers: 0,
    following: 0
  }
});
