import { createAction, handleActions } from 'redux-actions';
import fetch from 'isomorphic-fetch';
import { config } from '../config';

export const LOAD_USER = 'LOAD_USER';
export const UPDATE_POSTS_COUNTER = 'UPDATE_POSTS_COUNTER';

var defUser = {
  username: 'Jesus Christ',
  // photo: 'http://images2.fanpop.com/image/photos/10700000/Jesus-Christ-clarklover-10737807-363-391.jpg',
  photo: 'http://yourselfr.com/upload/avatar/nophoto.png',
  alias: 'asd',
  status: '',
  header: '',
  online: {},
  stats: {
    visits: 0,
    followers: 0,
    following: 0,
    posts: 0
  }
}
// export const loadUser = createAction(LOAD_USER, async (alias) => {
//   // if (!alias) {
//   //
//   // } else {
//   //   alias = 'sdadsa___';
//   // }
//
//   console.log('alias: ' + alias);
//
//   var result = await fetch(`${config.http}/api/users/${alias}`);
//   result = result.json();
//   return result;
// });
export const load = createAction(LOAD_USER);

// fetch(`${config.http}api/users/${alias}`)
export const updatePostsCounter = createAction(UPDATE_POSTS_COUNTER, (value = 1) => value);

export const loadUser = (alias) => {
  return (dispatch, getState) => {
    if (!alias) {
      alias = window.location.pathname.substr(1);
      alias = alias.split('/')[0];
    }
    fetch(`${config.http}/api/users/${alias}`)
      .then((r) => r.json())
      .catch((e) => {
        // window.location.href = '404';
      })
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
    return {...state, ...{status: '', background: ''}, ...payload};
  },
  UPDATE_POSTS_COUNTER: (state, {payload}) => {
    return Object.assign({}, state, {
      stats: Object.assign({}, state.stats, {
        posts: state.stats.posts + 1
      })
    })
  }
}, defUser);
