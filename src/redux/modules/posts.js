import { createAction, handleActions } from 'redux-actions';
import {config} from '../config.js';
import { updatePostsCounter } from './user';
console.log(config);

export const LOAD_POSTS = 'LOAD_POSTS';
export const SEND_POST = 'SEND_POST';

export const loadPosts = createAction(LOAD_POSTS, async id => {
  var alias = window.location.pathname.substr(1);
  // var alias = 'abracadabra';
  var posts = await fetch(`${config.http}/api/posts/${alias}`);
  posts = posts.json();
  return posts;
});
export const send = createAction(SEND_POST);

export const sendPost = (text) => {
  return (dispatch, getState) => {
    var alias = getState().user.alias;
    fetch(`${config.http}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-type': config.post
      },
      body: `text=${text}&created_by=${alias}`
    })
    .then((r) => r.json())
    .then((data) => {
      dispatch(send());
      dispatch(loadPosts());
      dispatch(updatePostsCounter());
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
