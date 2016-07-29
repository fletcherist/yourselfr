import { createAction, handleActions } from 'redux-actions'
import { config } from '../config'
import { fetchUser, fetchSubscribe } from './isFetching'
import { loadPostsPatch } from './posts'
import { routeActions } from 'react-router-redux'
import ga from 'react-ga'
import cookie from 'react-cookie'

const LOAD_USER = 'LOAD_USER'
const SUBSCRIBE = 'SUBSCRIBE'
const UPDATE_SUBSCRIPTION_COUNTER = 'UPDATE_SUBSCRIPTION_COUNTER'
const UPDATE_POSTS_COUNTER = 'UPDATE_POSTS_COUNTER'

const PATCH_USERNAME = 'PATCH_USERNAME'
const PATCH_ALIAS = 'PATCH_ALIAS'
const PATCH_STATUS = 'PATCH_STATUS'
const PATCH_AVATAR = 'PATCH_AVATAR'
const PATCH_BACKGROUND = 'PATCH_BACKGROUND'

export const patchUsername = createAction(PATCH_USERNAME)
export const patchAlias = createAction(PATCH_ALIAS)
export const patchStatus = createAction(PATCH_STATUS)
export const patchAvatar = createAction(PATCH_AVATAR)
export const patchBackground = createAction(PATCH_BACKGROUND)

const PATCH_VK = 'PATCH_VK'
const PATCH_TWITTER = 'PATCH_TWITTER'
const PATCH_TUMBLR = 'PATCH_TUMBLR'
const PATCH_INSTAGRAM = 'PATCH_INSTAGRAM'
const PATCH_FACEBOOK = 'PATCH_FACEBOOK'
export const patchVK = createAction(PATCH_VK)
export const patchTwitter = createAction(PATCH_TWITTER)
export const patchTumblr = createAction(PATCH_TUMBLR)
export const patchInstagram = createAction(PATCH_INSTAGRAM)
export const patchFacebook = createAction(PATCH_FACEBOOK)

export const updatePostsCounter = createAction(UPDATE_POSTS_COUNTER)

export function getAlias () {
  var alias = window.location.pathname.substr(1)
  if (!alias) {
    // Try to use hash routing
    alias = window.location.hash
    var regex = /#\/.{1,30}\?/
    alias = regex.exec(alias)[0]
    alias = alias.substr(2, alias.length - 3)
    alias = alias.split('/')[0]
    console.log(alias)
  } else {
    alias = alias.split('/')[0]
  }

  return alias
}

const loadUserPatch = createAction(LOAD_USER)
export const loadUser = (alias) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(fetchUser({status: true}))

      var currentAlias = getAlias()
      if (!alias) {
        alias = currentAlias
      } else {
        if (alias === currentAlias) {
          resolve()
          return false
        }
      }

      if (alias === 'preferences' ||
         alias === 'share-with-social' ||
         alias === 'feed') {
        var authenticated = cookie.load('authenticated')
        if (!authenticated) {
          window.location.href = '404'
        }
        alias = cookie.load('alias')
        fetchData()
      } else {
        fetchData()
      }

      function fetchData () {
        fetch(`${config.http}/api/all/user/${alias}`, {credentials: 'include'})
          .then((r) => r.json())
          .catch((e) => {
            window.location.href = '404'
          })
          .then((data) => {
            dispatch(fetchUser({status: false}))
            if (!data.user) {
              resolve()
            }
            data.user.isLoaded = true
            dispatch(loadUserPatch(data.user))
            dispatch(loadPostsPatch(data.posts))

            ga.event({
              category: 'User',
              action: 'Userpage Loaded'
            })
            resolve()
          })
      }
    })
  }
}

const subscribePatch = createAction(SUBSCRIBE)
const updateSubscriptionCounter = createAction(UPDATE_SUBSCRIPTION_COUNTER)
export const subscribe = (alias, updateCounters) => {
  return (dispatch, getState) => {
    dispatch(fetchSubscribe(true))
    fetch(`${config.http}/api/subscriptions/follow`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': config.post
      },
      body: `following=${alias}`
    })
    .then((r) => r.json())
    .then((res) => {
      res.count
      var status = false
      if (res.status === 1) {
        status = true
      } else if (res.status === 2) {
        status = false
      } else if (res.status === -1) {
        dispatch(routeActions.push('/login'))
      }
      console.log(res)
      dispatch(fetchSubscribe(false))
      dispatch(subscribePatch(status))

      console.log('updateCounters', updateCounters)
      if (updateCounters) {
        dispatch(updateSubscriptionCounter(res.current))
      }
      ga.event({
        category: 'Subscriptions',
        action: 'User Subscribed'
      })
    })
  }
}

export const actions = {
  loadUser
}

var standartUser = {
  isFollowing: false,
  username: '',
  photo: 'http://yoursel.fr/upload/avatar/nophoto.png',
  alias: '',
  status: '',
  background: '',
  online: {
    status: false
  },
  stats: {
    visits: 0,
    followers: 0,
    following: 0,
    posts: 0
  },
  isLoaded: false
}

export default handleActions({
  LOAD_USER: (state, { payload }) => {
    return {...state, ...{status: '', background: ''}, ...payload}
  },
  UPDATE_POSTS_COUNTER: (state, {payload}) => {
    return Object.assign({}, state, {
      stats: Object.assign({}, state.stats, {
        posts: state.stats.posts + 1
      })
    })
  },
  SUBSCRIBE: (state, { payload }) => {
    return {...state, ...{isFollowing: payload}}
  },
  UPDATE_SUBSCRIPTION_COUNTER: (state, { payload }) => {
    return Object.assign({}, state, {
      stats: Object.assign({}, state.stats, {
        followers: payload
      })
    })
  },

  PATCH_USERNAME: (state, { payload }) => {
    return {...state, ...{username: payload}}
  },
  PATCH_ALIAS: (state, { payload }) => {
    return {...state, ...{alias: payload}}
  },
  PATCH_STATUS: (state, { payload }) => {
    return {...state, ...{status: payload}}
  },
  PATCH_AVATAR: (state, { payload }) => {
    return {...state, ...{photo: payload}}
  },
  PATCH_BACKGROUND: (state, { payload }) => {
    return {...state, ...{background: payload}}
  },

  PATCH_VK: (state, { payload }) => {
    return {...state, ...{social: {...state.social, vk: payload}}}
  },
  PATCH_TWITTER: (state, { payload }) => {
    return {...state, ...{social: {...state.social, twitter: payload}}}
  },
  PATCH_TUMBLR: (state, { payload }) => {
    return {...state, ...{social: {...state.social, tumblr: payload}}}
  },
  PATCH_INSTAGRAM: (state, { payload }) => {
    return {...state, ...{social: {...state.social, instagram: payload}}}
  },
  PATCH_FACEBOOK: (state, { payload }) => {
    return {...state, ...{social: {...state.social, facebook: payload}}}
  }
}, standartUser)
