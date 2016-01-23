import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import counter from './modules/counter'
import user from './modules/user'
import posts from './modules/posts'

export default combineReducers({
  counter,
  user,
  posts,
  router
})
