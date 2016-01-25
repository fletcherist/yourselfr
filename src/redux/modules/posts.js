import { createAction, handleActions } from 'redux-actions';
import {config} from '../config.js';
import {loadUser} from './user';
console.log(config);

export const LOAD_POSTS = 'LOAD_POSTS';
export const SEND_POST = 'SEND_POST';

export const load = createAction(LOAD_POSTS);
export const send = createAction(SEND_POST);
export const loadPosts = () => {
  return (dispatch, getState) => {
    fetch(config.http + 'api/posts/abracadabra')
      .then((r) => r.json())
      .then((data) => {
        dispatch(load(data));
      });
  }
}

export const sendPost = (text) => {
  return (dispatch, getState) => {
    var alias = getState().user.alias;
    console.log(`ALIAS ${alias}`)
    fetch(config.http + 'api/posts', {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `text=${text}&created_by=${alias}`
    })
    .then((r) => r.json())
    .then((data) => {
      dispatch(send());
      dispatch(loadPosts());
      dispatch(loadUser());
    });
  }
}

export const actions = {
  loadPosts,
  sendPost
}

export default handleActions({
  [LOAD_POSTS]: (state, { payload }) => {
    return payload;
  }
}, []);
