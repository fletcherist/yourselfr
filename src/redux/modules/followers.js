import { createAction } from 'redux-actions';
import fetch from 'isomorphic-fetch';
import { config } from '../config';

export const LOAD_FOLLOWERS = 'LOAD_FOLLOWERS';
export const LOAD_FOLLOWING = 'LOAD_FOLLOWING';
export const FETCHING_DATA = 'FETCHING_DATA';
const FETCH_FOLLOWERS = 'FETCH_FOLLOWERS';
const FETCH_FOLLOWING = 'FETCH_FOLLOWING';

// export const loadPosts = createAction(LOAD_POSTS, async id => {
//   var posts = await fetch(`${config.http}/api/posts/abracadabra`);
//   posts = posts.json();
//   return posts;
// });
const fetchFollowers = createAction(FETCH_FOLLOWERS);
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

const fetchFollowing = createAction(FETCH_FOLLOWING);
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

// export default handleAction(LOAD_FOLLOWERS, (state = 7, {payload}) => ({
//   ...payload
// }));

export function followers (state = {isFetching: false}, action) {
  switch (action.type) {
    case FETCH_FOLLOWERS:
      return {...state, ...{isFetching: action.payload}}
    case LOAD_FOLLOWERS:
      return {...state, ...{followers: action.payload}};
    default:
      return state;
  }
}

export function following (state = {}, action) {
  switch (action.type) {
    case FETCH_FOLLOWING:
      return {...state, ...{isFetching: action.payload}}
    case LOAD_FOLLOWING:
      return {...state, ...{following: action.payload}};
    default:
      return state;
  }
}

// export default handleActions({
//   LOAD_FOLLOWERS: (state, { payload }) => {
//     if (payload) {
//       return payload
//     }
//     return state;
//   },
//   LOAD_FOLLOWING: (state, { payload }) => {
//     if (payload) {
//       return payload
//     }
//     return state;
//   }
// }, []);
