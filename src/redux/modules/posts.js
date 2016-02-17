import { createAction, handleActions } from 'redux-actions';
import {config} from '../config.js';
import { updatePostsCounter } from './user';

export const LOAD_POSTS = 'LOAD_POSTS';
export const SEND_POST = 'SEND_POST';
export const LOAD_MORE_POSTS = 'LOAD_MORE_POSTS';
export const REMOVE_POST = 'REMOVE_POST';
export const LIKE_POST = 'LIKE_POST';
const FETCH_POSTS = 'FETCH_POSTS';

export const likePost = createAction(LIKE_POST, async (id) => {
  if (!id) {
    return false;
  }
  console.log(id);
  fetch(`${config.http}/api/likes`, {
    method: 'POST',
    headers: {
      'Content-type': config.post
    },
    body: `object=${id}`
  })
  .then((r) => r.json())
  .then((res) => {
    console.log(res);
  })
})

const fetchPosts = createAction(FETCH_POSTS);
const loadPostsPatch = createAction(LOAD_POSTS);

export const loadPosts = (offset) => {
  return (dispatch, getState) => {
    var alias = window.location.pathname.substr(1);
    // var alias = 'abracadabra';
    var url = `${config.http}/api/posts/${alias}`
    if (offset) {
      url += `/${offset}`
    }
    dispatch(fetchPosts(true));
    console.log(url);
    fetch(url)
      .then((r) => r.json())
      .then((posts) => {
        dispatch(loadPostsPatch(posts));
        dispatch(fetchPosts(false));
      })
  }
};

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

export const removePost = id => {
  return (dispatch, getState) => {
    fetch(`${config.http}/api/posts/remove${id}`, {
      method: 'GET',
      headers: {
        'Content-type': config.post
      }
    })
  }
}

export const send = createAction(SEND_POST);

export const sendPost = (text, photo) => {
  return (dispatch, getState) => {
    var alias = getState().user.alias;
    var body = `text=${text}&created_by=${alias}`;
    if (photo) {
      body += `&photo=${photo}`;
    }
    if (!photo && !text) {
      return;
    }
    fetch(`${config.http}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-type': config.post
      },
      body: body
    })
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
      if (data.status === 1) {
        dispatch(loadPosts());
        dispatch(updatePostsCounter());
      } else {

      }
      dispatch(send());
    });
  }
}

export const actions = {
  loadPosts,
  sendPost,
  loadMorePosts,
  removePost,
  likePost
}

export default handleActions({
  [LOAD_POSTS]: (state, { payload }) => {
    return {...state, posts: payload};
  },
  [LOAD_MORE_POSTS]: (state, { payload }) => {
    return {...state, ...{posts: payload}};
  },
  [FETCH_POSTS]: (state, { payload }) => {
    return {... state, ...{isFetching: payload}};
  }
}, {});
