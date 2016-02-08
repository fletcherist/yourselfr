import { createAction, handleActions } from 'redux-actions';
import {config} from '../config.js';
import { updatePostsCounter } from './user';

export const LOAD_POSTS = 'LOAD_POSTS';
export const SEND_POST = 'SEND_POST';
export const LOAD_MORE_POSTS = 'LOAD_MORE_POSTS';

export const loadPosts = createAction(LOAD_POSTS, async (offset) => {
  var alias = window.location.pathname.substr(1);
  // var alias = 'abracadabra';
  var url = `${config.http}/api/posts/${alias}`
  if (offset) {
    url += `/${offset}`
  }
  console.log(url);
  var posts = await fetch(url);
  posts = posts.json(posts);
  return posts;
});

export const loadMorePosts = createAction(LOAD_MORE_POSTS, async (offset) => {
  var alias = window.location.pathname.substr(1);
  // var alias = 'abracadabra';
  var url = `${config.http}/api/posts/${alias}`
  if (offset) {
    url += `/${offset}`
  }
  console.log(url);
  var posts = await fetch(url);
  posts = posts.json(posts);
  return posts;
});

export const send = createAction(SEND_POST);

export const sendPost = (text, photo) => {
  return (dispatch, getState) => {
    var alias = getState().user.alias;
    fetch(`${config.http}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-type': config.post
      },
      body: `text=${text}&created_by=${alias}&photo=${photo}`
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
  sendPost,
  loadMorePosts
}

export default handleActions({
  [LOAD_POSTS]: (state, { payload }) => {
    return payload;
  },
  [LOAD_MORE_POSTS]: (state, { payload }) => {
    return [...state, ...payload];
  }
}, []);
