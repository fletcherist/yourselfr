import { createAction, handleActions } from 'redux-actions'

const FETCH_FOLLOWERS = 'FETCH_FOLLOWERS'
const FETCH_FOLLOWING = 'FETCH_FOLLOWING'
const FETCH_POSTS = 'FETCH_POSTS'
const FETCH_USERNAME = 'FETCH_USERNAME'
const FETCH_ALIAS = 'FETCH_ALIAS'
const FETCH_STATUS = 'FETCH_STATUS'
const FETCH_AVATAR = 'FETCH_AVATAR'
const FETCH_REMOVE_AVATAR = 'FETCH_REMOVE_AVATAR'
const FETCH_BACKGROUND = 'FETCH_BACKGROUND'
const FETCH_REMOVE_BACKGROUND = 'FETCH_REMOVE_BACKGROUND'
const FETCH_LOAD_MORE_POSTS = 'FETCH_LOAD_MORE_POSTS'
const FETCH_LOGIN = 'FETCH_LOGIN'
const FETCH_REGISTER = 'FETCH_REGISTER'
const FETCH_SOCIAL_NETWORKS = 'FETCH_SOCIAL_NETWORKS'
const FETCH_SUBSCRIBE = 'FETCH_SUBSCRIBE'
const FETCH_USER = 'FETCH_USER'
const FETCH_FEED = 'FETCH_FEED'

export const fetchFollowers = createAction(FETCH_FOLLOWERS)
export const fetchFollowing = createAction(FETCH_FOLLOWING)
export const fetchPosts = createAction(FETCH_POSTS)
export const fetchLoadMorePosts = createAction(FETCH_LOAD_MORE_POSTS)
export const fetchUsername = createAction(FETCH_USERNAME)
export const fetchAlias = createAction(FETCH_ALIAS)
export const fetchStatus = createAction(FETCH_STATUS)
export const fetchAvatar = createAction(FETCH_AVATAR)
export const fetchRemoveAvatar = createAction(FETCH_REMOVE_AVATAR)
export const fetchBackground = createAction(FETCH_BACKGROUND)
export const fetchRemoveBackground = createAction(FETCH_REMOVE_BACKGROUND)
export const fetchLogIn = createAction(FETCH_LOGIN)
export const fetchRegister = createAction(FETCH_REGISTER)
export const fetchUser = createAction(FETCH_USER)
export const fetchSocialNetworks = createAction(FETCH_SOCIAL_NETWORKS)
export const fetchSubscribe = createAction(FETCH_SUBSCRIBE)
export const fetchFeed = createAction(FETCH_FEED)

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
    return {...state, ...{avatar: {
      status: payload.status || false,
      state: payload.state
    }}}
  },
  FETCH_REMOVE_AVATAR: (state, {payload}) => {
    return {...state, ...{removeAvatar: payload}}
  },
  FETCH_BACKGROUND: (state, {payload}) => {
    return {...state, ...{background: {
      state: payload.state || false,
      status: payload.status
    }}}
  },
  FETCH_REMOVE_BACKGROUND: (state, {payload}) => {
    return {...state, ...{removeBackground: payload}}
  },
  FETCH_FOLLOWERS: (state, {payload}) => {
    return {...state, ...{followers: payload}}
  },
  FETCH_FOLLOWING: (state, {payload}) => {
    return {...state, ...{following: payload}}
  },
  FETCH_POSTS: (state, { payload }) => {
    return {... state, ...{posts: payload}}
  },
  FETCH_LOAD_MORE_POSTS: (state, { payload }) => {
    return {... state, ...{loadMorePosts: payload}}
  },
  FETCH_LOGIN: (state, { payload }) => {
    return {... state, ...{logIn: {
      status: payload[0],
      message: payload[1] || ''
    }}}
  },
  FETCH_REGISTER: (state, { payload }) => {
    return {... state, ...{register: {
      status: payload[0],
      message: payload[1] || ''
    }}}
  },
  FETCH_USER: (state, { payload }) => {
    return {...state, ...{user: {
      status: payload.status,
      state: payload.state
    }}}
  },
  FETCH_SOCIAL_NETWORKS: (state, { payload }) => {
    return {...state, ...{socialNetworks: {
      ...state.socialNetworks,
      vk: payload.vk || {status: false, state: false},
      twitter: payload.twitter || {status: false, state: false},
      tumblr: payload.tumblr || {status: false, state: false},
      instagram: payload.instagram || {status: false, state: false},
      facebook: payload.facebook || {status: false, state: false}
    }}}
  },
  FETCH_SUBSCRIBE: (state, { payload }) => {
    return {...state, ...{subscribe: payload}}
  },
  FETCH_FEED: (state, { payload }) => {
    return {...state, ...{feed: payload}}
  }
}, {
  user: {
    status: false,
    state: undefined
  },
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
  socialNetworks: {
    vk: {
      status: false,
      state: undefined
    },
    twitter: {
      status: false,
      state: undefined
    },
    tumblr: {
      status: false,
      state: undefined
    },
    instagram: {
      status: false,
      state: undefined
    },
    google: {
      status: false,
      state: undefined
    },
    facebook: {
      status: false,
      state: undefined
    }
  },
  posts: false,
  endlessFeed: false,
  loadMorePosts: false,
  followers: false,
  following: false,
  avatar: {
    status: false,
    state: false
  },
  removeAvatar: false,
  background: false,
  removeBackground: false,
  subscribe: false,
  logIn: {
    status: false,
    message: undefined
  },
  register: {
    status: false,
    message: undefined
  }
})
