import { createAction, handleActions } from 'redux-actions';
import { config } from '../config';
import { fetchUser, fetchSubscribe } from './isFetching';
import { routeActions } from 'react-router-redux';
import ga from 'react-ga';

const LOAD_USER = 'LOAD_USER';
const UPDATE_POSTS_COUNTER = 'UPDATE_POSTS_COUNTER';
const SUBSCRIBE = 'SUBSCRIBE';
const UPDATE_SUBSCRIPTION_COUNTER = 'UPDATE_SUBSCRIPTION_COUNTER';

export const load = createAction(LOAD_USER);
export const updatePostsCounter = createAction(UPDATE_POSTS_COUNTER, (value = 1) => value);

function getAlias () {
  var alias = window.location.pathname.substr(1);
  alias = alias.split('/')[0];
  return alias;
}

export const loadUser = (alias) => {
  return (dispatch, getState) => {
    dispatch(fetchUser({status: true}));

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
      fetch(`${config.http}/api/users/${alias}`, {credentials: 'include'})
        .then((r) => r.json())
        .catch((e) => {
          window.location.href = '404';
        })
        .then((data) => {
          dispatch(fetchUser({status: false}));
          dispatch(load(data));

          if (!data.alias) {
            var dev = confirm('Are you for dev here?');
            if (!dev) {
              dispatch(routeActions.push('/404'));
            } else {
              return false;
            }
          }

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
