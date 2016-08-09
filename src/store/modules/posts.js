import { createAction, handleActions } from 'redux-actions'
import { config } from 'store/config'
import { updatePostsCounter } from './user'
import { fetchPosts, fetchLoadMorePosts } from './isFetching'
import { LOAD_COMMENTS } from './comments'
import ga from 'react-ga'

import {
  LOAD_POSTS,
  SEND_POST,
  LOAD_MORE_POSTS,
  REMOVE_POST,
  LIKE_POST,
  LOAD_NEW_POSTS
} from './posts/constants'

import loadNewPosts from './posts/loadNewPosts'

export const likePost = createAction(LIKE_POST, async (id, type) => {
  if (!id) {
    return false
  }
  const url = {
    post: `${config.http}/api/likes`,
    comment: `${config.http}/api/likes/comment`
  }
  var request = type === 'comment' ? url.comment : url.post
  console.log(type, request)
  fetch(request, {
    method: 'POST',
    headers: {
      'Content-type': config.post
    },
    body: `object=${id}`
  })
  .then((r) => r.json())
  .then((res) => {
    console.log(res)
  })
})

export const loadPostsPatch = createAction(LOAD_POSTS)
export const loadPosts = (offset) => {
  return (dispatch, getState) => {
    var alias = window.location.pathname.substr(1)
    // var alias = 'abracadabra';
    var url = `${config.http}/api/posts/${alias}`
    if (offset) {
      url += `/${offset}`
    }
    dispatch(fetchPosts(true))
    fetch(url)
      .then((r) => r.json())
      .then((posts) => {
        dispatch(loadPostsPatch(posts))
        dispatch(fetchPosts(false))
      })
    setTimeout(() => {
      dispatch(fetchPosts(false))
    }, 2000)
  }
}

const removePostPatch = createAction(REMOVE_POST)
export const removePost = id => {
  return (dispatch, getState) => {
    console.log(id)
    fetch(`${config.http}/api/posts/remove/${id}`, {credentials: 'include'})
      .then((r) => r.json())
      .then((res) => {
        console.log(res)
      })
      .catch((e) => console.log(e))
    dispatch(removePostPatch(id))
    ga.event({
      category: 'Posts',
      action: 'Removed Post'
    })
  }
}

export const loadMorePostsPatch = createAction(LOAD_MORE_POSTS)
export const loadMorePosts = (offset) => {
  return (dispatch, getState) => {
    dispatch(fetchLoadMorePosts(true))
    var alias = window.location.pathname.substr(1)
    // var alias = 'abracadabra';
    var url = `${config.http}/api/posts/${alias}`
    if (offset) {
      url += `/${offset}`
    }
    console.log(url)
    fetch(url)
      .then((r) => r.json())
      .then((posts) => {
        if (!posts) {

        }
        dispatch(fetchLoadMorePosts(false))
        dispatch(loadMorePostsPatch(posts))
        ga.event({
          category: 'Posts',
          action: 'More Posts Loaded'
        })
      })
  }
}

export const send = createAction(SEND_POST)
export const sendPost = (text, photo) => {
  return (dispatch, getState) => {
    var alias = getState().user.alias
    var body = `text=${text}&created_by=${alias}`
    if (photo) {
      body += `&photo=${photo}`
    }
    if (!photo && !text) {
      return
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
      console.log(data)
      if (data.status === 1) {
        dispatch(loadNewPosts())
        dispatch(updatePostsCounter())
      } else {

      }
      dispatch(send())
      ga.event({
        category: 'Posts',
        action: 'Created Post'
      })
    })
  }
}

export const actions = {
  loadPosts,
  sendPost,
  loadMorePosts,
  removePost,
  likePost,
  loadNewPosts
}

const findPostById = (state, id) => {
  for (var i = 0; i < state.length; i++) {
    var postID = state[i]._id
    if (postID === id) {
      return i
    }
  }
  return false
}

export default handleActions({
  [LOAD_POSTS]: (state, { payload }) => {
    return [...payload]
  },
  [LOAD_MORE_POSTS]: (state, { payload }) => {
    return [...state, ...payload]
  },
  [LOAD_NEW_POSTS]: (state, { payload }) => {
    return [...payload, ...state]
  },
  [REMOVE_POST]: (state, { payload }) => {
    // Find a post with that ID and slice it.
    var postNumber = findPostById(state, payload)
    return [
      ...state.slice(0, postNumber),
      ...state.slice(postNumber + 1)
    ]
  },
  [LOAD_COMMENTS]: (state, { payload }) => {
    const { postId, comments } = payload
    var postNumber = findPostById(state, postId)
    var post = state[postNumber]
    post.comments = comments
    return [...state, ...post]
  }
  // [REMOVE_COMMENT]: (state, { payload }) => {
  //   for (var i = 0; i < state.length; i++) {
  //     var comments = state[i].comments;
  //     for (var e = 0; e < comments.length; e++) {
  //       var commentID = comments[e]._id;
  //       if (commentID === payload) {
  //         break;
  //       }
  //     }
  //   }
  //   return [...state]
  // }
}, [])
