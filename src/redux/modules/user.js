import { createAction, handleActions } from 'redux-actions';
import { config } from '../config';
import { fetchUser, fetchSubscribe, fetchPosts } from './isFetching';
import { loadPostsPatch } from './posts';
import { routeActions } from 'react-router-redux';
import ga from 'react-ga';

const LOAD_USER = 'LOAD_USER';
const SUBSCRIBE = 'SUBSCRIBE';
const UPDATE_SUBSCRIPTION_COUNTER = 'UPDATE_SUBSCRIPTION_COUNTER';

function getAlias () {
  var alias = window.location.pathname.substr(1);
  alias = alias.split('/')[0];
  return alias;
}

const loadUserPatch = createAction(LOAD_USER);
export const loadUser = (alias) => {
  return (dispatch, getState) => {
    dispatch(fetchUser({status: true}));
    fetchPosts(fetchPosts(true));

    var currentAlias = getAlias();
    if (!alias) {
      alias = currentAlias;
    } else {
      if (alias === currentAlias) {
        return false;
      }
    }

    if (alias === 'preferences' || alias === 'share-with-social') {
      setTimeout(() => {
        alias = getState().auth.user.alias;
        fetchData();
      }, 200)
    } else {
      fetchData();
    }

    function fetchData () {
      fetch(`${config.http}/api/all/user/${alias}`, {credentials: 'include'})
        .then((r) => r.json())
        .catch((e) => {
          window.location.href = '404';
        })
        .then((data) => {
          dispatch(fetchUser({status: false}));
          fetchPosts(fetchPosts(false));
          if (!data.user) {
            return dispatch(routeActions.push('/404'));
          }
          dispatch(loadUserPatch(data.user));
          dispatch(loadPostsPatch(data.posts));

          ga.event({
            category: 'User',
            action: 'Userpage Loaded'
          });
        });
    }
  }
}

const subscribePatch = createAction(SUBSCRIBE);
const updateSubscriptionCounter = createAction(UPDATE_SUBSCRIPTION_COUNTER);
export const subscribe = (alias, updateCounters) => {
  return (dispatch, getState) => {
    dispatch(fetchSubscribe(true));
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
      res.count;
      var status = false;
      if (res.status === 1) {
        status = true;
      } else if (res.status === 2) {
        status = false;
      } else if (res.status === -1) {
        dispatch(routeActions.push('/login'));
      }
      console.log(res);
      dispatch(fetchSubscribe(false));
      dispatch(subscribePatch(status));

      console.log('updateCounters', updateCounters);
      if (updateCounters) {
        dispatch(updateSubscriptionCounter(res.current));
      }
      ga.event({
        category: 'Subscriptions',
        action: 'User Subscribed'
      });
    })
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
  }
}, {
  username: ' ',
  photo: 'http://yourselfr.com/upload/avatar/nophoto.png',
  alias: ' ',
  status: '',
  online: {},
  stats: {
    visits: 0,
    followers: 0,
    following: 0,
    posts: 0
  }
});
