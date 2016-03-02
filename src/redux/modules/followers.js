import { createAction } from 'redux-actions';
import { config } from '../config';
import { fetchFollowers, fetchFollowing } from './isFetching';

export const LOAD_FOLLOWERS = 'LOAD_FOLLOWERS';
export const LOAD_FOLLOWING = 'LOAD_FOLLOWING';
export const FETCHING_DATA = 'FETCHING_DATA';

// export const loadPosts = createAction(LOAD_POSTS, async id => {
//   var posts = await fetch(`${config.http}/api/posts/abracadabra`);
//   posts = posts.json();
//   return posts;
// });
const loadFollowersPatch = createAction(LOAD_FOLLOWERS);
export const loadFollowers = () => {
  return (dispatch, getState) => {
    var alias = window.location.pathname.substr(1);
    alias = alias.split('/')[0];

    dispatch(fetchFollowers(true));
    fetch(`${config.http}/api/subscriptions/followers/${alias}`)
      .then((r) => r.json())
      .then((res) => {
        var followers = res.followers;
        dispatch(loadFollowersPatch(followers));
        dispatch(fetchFollowers(false));
      })
  }
};

const loadFollowingPatch = createAction(LOAD_FOLLOWING);
export const loadFollowing = () => {
  return (dispatch, getState) => {
    var alias = window.location.pathname.substr(1);
    alias = alias.split('/')[0];

    dispatch(fetchFollowing(true));
    fetch(`${config.http}/api/subscriptions/following/${alias}`)
      .then((r) => r.json())
      .then((res) => {
        var following = res.following;
        dispatch(loadFollowingPatch(following));
        dispatch(fetchFollowing(false));
      })
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
