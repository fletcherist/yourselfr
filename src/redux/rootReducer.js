import { combineReducers } from 'redux'
import { routeReducer as router } from 'react-router-redux';
import user from './modules/user'
import posts from './modules/posts'
import auth from './modules/auth'
import isFetching from './modules/isFetching';
import feed from './modules/endlessFeed';
import { followers, following } from './modules/followers';
import friends from './modules/friends';

var subscriptions = combineReducers({
  followers,
  following
})

export default combineReducers({
  user,
  posts,
  router,
  auth,
  subscriptions,
  isFetching,
  feed,
  friends
})
