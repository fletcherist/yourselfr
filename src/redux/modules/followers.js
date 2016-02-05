import { createAction, handleActions, handleAction } from 'redux-actions';
import fetch from 'isomorphic-fetch';
import { config } from '../config';

export const LOAD_FOLLOWERS = 'LOAD_FOLLOWERS';
export const LOAD_FOLLOWING = 'LOAD_FOLLOWING';

// export const loadPosts = createAction(LOAD_POSTS, async id => {
//   var posts = await fetch(`${config.http}/api/posts/abracadabra`);
//   posts = posts.json();
//   return posts;
// });
export const loadFollowers = createAction(LOAD_FOLLOWERS, async () => {
  var alias = window.location.pathname.substr(1);
  alias = alias.split('/')[0];

  var followers = await fetch(`${config.http}/api/subscriptions/followers/${alias}`);
  followers = await followers.json();

  return followers.followers;
});

export const loadFollowing = createAction(LOAD_FOLLOWING, async () => {
  var alias = window.location.pathname.substr(1);
  alias = alias.split('/')[0];

  var following = await fetch(`${config.http}/api/subscriptions/following/${alias}`);
  following = await following.json();
  console.log(following);
  return following.following;
})

export const actions = {
  loadFollowers,
  loadFollowing
}

// export default handleAction(LOAD_FOLLOWERS, (state = 7, {payload}) => ({
//   ...payload
// }));

export function followers (state = {}, action) {
  switch (action.type) {
    case LOAD_FOLLOWERS:
      return action.payload;
    default:
      return state;
  }
}

export function following (state = {}, action) {
  switch (action.type) {
    case LOAD_FOLLOWING:
      return action.payload;
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
