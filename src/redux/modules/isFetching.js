import { createAction, handleActions } from 'redux-actions';

const FETCH_FOLLOWERS = 'FETCH_FOLLOWERS';
const FETCH_FOLLOWING = 'FETCH_FOLLOWING';
const FETCH_POSTS = 'FETCH_POSTS';
const FETCH_USERNAME = 'FETCH_USERNAME';
const FETCH_ALIAS = 'FETCH_ALIAS';
const FETCH_STATUS = 'FETCH_STATUS';
const FETCH_AVATAR = 'FETCH_AVATAR';
const FETCH_BACKGROUND = 'FETCH_BACKGROUND';
const FETCH_LOAD_MORE_POSTS = 'FETCH_LOAD_MORE_POSTS';
const FETCH_ENDLESS_FEED = 'FETCH_ENDLESS_FEED';
const FETCH_LOGIN = 'FETCH_LOGIN';
const FETCH_REGISTER = 'FETCH_REGISTER';

export const fetchFollowers = createAction(FETCH_FOLLOWERS);
export const fetchFollowing = createAction(FETCH_FOLLOWING);
export const fetchPosts = createAction(FETCH_POSTS);
export const fetchEndlessFeed = createAction(FETCH_ENDLESS_FEED);
export const fetchLoadMorePosts = createAction(FETCH_LOAD_MORE_POSTS);
export const fetchUsername = createAction(FETCH_USERNAME);
export const fetchAlias = createAction(FETCH_ALIAS);
export const fetchStatus = createAction(FETCH_STATUS);
export const fetchAvatar = createAction(FETCH_AVATAR);
export const fetchBackground = createAction(FETCH_BACKGROUND);
export const fetchLogIn = createAction(FETCH_LOGIN);
export const fetchRegister = createAction(FETCH_REGISTER);

export const actions = {
  fetchFollowers,
  fetchFollowing,
  fetchPosts
}

export default handleActions({
  FETCH_USERNAME: (state, {payload}) => {
    return {...state, ...{username: {
      status: payload.status,
      state: payload.state,
      message: payload.message
    }}}
  },
  FETCH_ALIAS: (state, {payload}) => {
    return {...state, ...{alias: {
      status: payload.status,
      state: payload.state,
      message: payload.message
    }}}
  },
  FETCH_STATUS: (state, {payload}) => {
    return {...state, ...{status: {
      status: payload.status,
      state: payload.state,
      message: payload.message
    }}}
  },
  FETCH_AVATAR: (state, {payload}) => {
    return {...state, ...{avatar: payload}}
  },
  FETCH_BACKGROUND: (state, {payload}) => {
    return {...state, ...{background: payload}}
  },
  FETCH_FOLLOWERS: (state, {payload}) => {
    return {...state, ...{followers: payload}}
  },
  FETCH_FOLLOWING: (state, {payload}) => {
    return {...state, ...{following: payload}}
  },
  FETCH_POSTS: (state, { payload }) => {
    return {... state, ...{posts: payload}};
  },
  FETCH_LOAD_MORE_POSTS: (state, { payload }) => {
    return {... state, ...{loadMorePosts: payload}};
  },
  FETCH_ENDLESS_FEED: (state, { payload }) => {
    return {... state, ...{endlessFeed: payload}};
  },
  FETCH_LOGIN: (state, { payload }) => {
    return {... state, ...{logIn: {
      status: payload[0],
      message: payload[1] || ''
    }}};
  },
  FETCH_REGISTER: (state, { payload }) => {
    return {... state, ...{register: {
      status: payload[0],
      message: payload[1] || ''
    }}};
  }
}, {
  username: {
    status: false,
    state: undefined,
    message: undefined
  },
  alias: {
    status: false,
    state: undefined,
    message: undefined
  },
  status: {
    status: false,
    state: undefined,
    message: undefined
  },
  posts: false,
  endlessFeed: false,
  loadMorePosts: false,
  followers: false,
  following: false,
  avatar: false,
  background: false,
  logIn: {
    status: false,
    message: undefined
  },
  register: {
    status: false,
    message: undefined
  }
});
