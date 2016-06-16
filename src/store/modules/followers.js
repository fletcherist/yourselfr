import { createAction } from 'redux-actions';
import { config } from '../config';
import { fetchFollowers, fetchFollowing } from './isFetching';

export const LOAD_FOLLOWERS = 'LOAD_FOLLOWERS';
export const LOAD_FOLLOWING = 'LOAD_FOLLOWING';

const getAlias = () => {
  var alias = window.location.pathname.substr(1);
  alias = alias.split('/')[0];
  return alias;
}
const loadFollowersPatch = createAction(LOAD_FOLLOWERS);
export const loadFollowers = () => {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      var alias = getAlias();

      dispatch(fetchFollowers(true));
      fetch(`${config.http}/api/subscriptions/followers/${alias}`, {credentials: 'include'})
        .then((r) => r.json())
        .then((res) => {
          var followers = res.followers;
          dispatch(loadFollowersPatch(followers));
          dispatch(fetchFollowers(false));
          resolve();
        })
    });
  }
};

const loadFollowingPatch = createAction(LOAD_FOLLOWING);
export const loadFollowing = () => {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      var alias = getAlias();

      dispatch(fetchFollowing(true));
      fetch(`${config.http}/api/subscriptions/following/${alias}`, {credentials: 'include'})
        .then((r) => r.json())
        .then((res) => {
          var following = res.following;
          dispatch(loadFollowingPatch(following));
          dispatch(fetchFollowing(false));
          resolve();
        })
    });
  }
}

export const actions = {
  loadFollowers,
  loadFollowing
}

export function followers (state = [], action) {
  switch (action.type) {
    case LOAD_FOLLOWERS:
      return [...action.payload];
    default:
      return state;
  }
}

export function following (state = [], action) {
  switch (action.type) {
    case LOAD_FOLLOWING:
      return [...action.payload];
    default:
      return state;
  }
}
