import { createAction, handleActions } from 'redux-actions';
import {config} from '../config.js';
import { updatePostsCounter } from './user';
import { fetchPosts, fetchLoadMorePosts } from './isFetching';
import ga from 'react-ga';

export const LOAD_POSTS = 'LOAD_POSTS';
export const SEND_POST = 'SEND_POST';
export const LOAD_MORE_POSTS = 'LOAD_MORE_POSTS';
export const REMOVE_POST = 'REMOVE_POST';
export const LIKE_POST = 'LIKE_POST';
export const ENDLESS_LOAD = 'ENDLESS_LOAD';
export const POST_COMMENT = 'POST_COMMENT';

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

export const loadPostsPatch = createAction(LOAD_POSTS);
export const loadPosts = (offset) => {
  return (dispatch, getState) => {
    var alias = window.location.pathname.substr(1);
    // var alias = 'abracadabra';
    var url = `${config.http}/api/posts/${alias}`;
    if (offset) {
      url += `/${offset}`
    }
    dispatch(fetchPosts(true));
    fetch(url)
      .then((r) => r.json())
      .then((posts) => {
        dispatch(loadPostsPatch(posts));
        dispatch(fetchPosts(false));
      })
  }
};

const endlessLoadPatch = createAction(ENDLESS_LOAD);
export const endlessLoad = () => {
  return (dispatch, getState) => {
    var lastPostID = getState().posts[0]._id;
    var alias = getState().user.alias;
    fetch(`${config.http}/api/posts/new/${alias}/${lastPostID}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.posts) {
          dispatch(endlessLoadPatch(res.posts));
        } else {
          console.log('new posts are not ready yet for patching');
        }
      })
  }
}

export const loadMorePostsPatch = createAction(LOAD_MORE_POSTS);
export const loadMorePosts = (offset) => {
  return (dispatch, getState) => {
    dispatch(fetchLoadMorePosts(true));
    var alias = window.location.pathname.substr(1);
    // var alias = 'abracadabra';
    var url = `${config.http}/api/posts/${alias}`
    if (offset) {
      url += `/${offset}`
    }
    console.log(url);
    fetch(url)
      .then((r) => r.json())
      .then((posts) => {
        if (!posts) {

        }
        dispatch(fetchLoadMorePosts(false));
        dispatch(loadMorePostsPatch(posts));
        ga.event({
          category: 'Posts',
          action: 'More Posts Loaded'
        });
      })
  }
}

const removePostPatch = createAction(REMOVE_POST);
export const removePost = id => {
  return (dispatch, getState) => {
    console.log(id);
    fetch(`${config.http}/api/posts/remove/${id}`, {credentials: 'include'})
      .then((r) => r.json())
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));
    dispatch(removePostPatch(id));
    ga.event({
      category: 'Posts',
      action: 'Removed Post'
    });
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
      credentials: 'include',
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
      ga.event({
        category: 'Posts',
        action: 'Created Post'
      });
    });
  }
}

export const postComment = (text, post_id) => {
  return (dispatch, getState) => {
    if (!text) {
      console.log('no text');
      return false;
    }
    console.log(post_id);
    var authenticated = getState().auth.authenticated;
    if (!authenticated) {
      return console.log('Only authenticated users can write comments');
    }
    var alias = getState().auth.user.alias;
    var body = `text=${text}&created_by=${alias}&post_id=${post_id}`;
    fetch(`${config.http}/api/comments`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': config.post
      },
      body: body
    })
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
      ga.event({
        category: 'Comments',
        action: 'Comment created'
      });
    });
  }
}

export const actions = {
  loadPosts,
  sendPost,
  loadMorePosts,
  removePost,
  likePost,
  endlessLoad
}

export default handleActions({
  [LOAD_POSTS]: (state, { payload }) => {
    return [...payload];
  },
  [LOAD_MORE_POSTS]: (state, { payload }) => {
    return [...state, ...payload];
  },
  [ENDLESS_LOAD]: (state, { payload }) => {
    return [...payload, ...state];
  },
  [REMOVE_POST]: (state, { payload }) => {
    // Find a post with that ID and slice it.
    for (var i = 0; i < state.length; i++) {
      var postID = state[i]._id;
      if (postID === payload) {
        break;
      }
    }
    return [
      ...state.slice(0, i),
      ...state.slice(i + 1)
    ];
  }
}, []);
