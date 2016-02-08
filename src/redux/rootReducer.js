import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import counter from './modules/counter'
import user from './modules/user'
import posts from './modules/posts'
import auth from './modules/auth'
import {followers, following} from './modules/followers';

var subscriptions = combineReducers({
  followers,
  following
})

export default combineReducers({
  counter,
  user,
  posts,
  router,
  auth,
  subscriptions
})
