// import { injectReducer } from '../../store/reducers'

import { loadUser, getAlias } from 'store/modules/user'
import { loadFollowers, loadFollowing } from 'store/modules/followers'
import { loadFriends } from 'store/modules/friends'

import { push } from 'react-router-redux'

export default (store) => ({
  'path': ':user',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const User = require('./containers/User').default
      // const reducer = require('../../store/modules/user').default
      // injectReducer(store, {key: 'user', reducer})

      var currentAlias = store.getState().user.alias
      var alias = getAlias()

      if (currentAlias === alias) {
        return cb(null, User)
      }
      store.dispatch(loadUser())
        .then(
         result => { cb(null, User) },
         error => {
           console.log(error)
           store.dispatch(push('/404'))
           throw new Error(error)
         })
        .catch(e => {
          console.log(e)
        })
    }, 'user')
  },
  indexRoute: {
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        const Posts = require('components/Posts').default
        cb(null, Posts)
      }, 'posts')
    }
  },
  childRoutes: [
    {
      'path': 'followers',
      getComponent (nextState, cb) {
        require.ensure([], (require) => {
          const Followers = require('components/Subscriptions/Followers').default

          store.dispatch(loadFollowers())
            .then(
              result => cb(null, Followers),
              error => {
                console.log(error)
              }
            )
        }, 'followers')
      }
    },
    {
      'path': 'following',
      getComponent (nextState, cb) {
        require.ensure([], (require) => {
          const Following = require('components/Subscriptions/Following').default

          store.dispatch(loadFollowing())
            .then(
              result => cb(null, Following),
              error => {
                console.log(error)
              }
            )
        }, 'following')
      }
    },
    {
      path: 'friends',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          const Friends = require('components/Subscriptions/Friends').default
          store.dispatch(loadFriends())
            .then(
              result => cb(null, Friends)
            )
        })
      }
    },
    {
      path: 'write',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          const WriteBox = require('components/WriteBox/OpenBox').default
          cb(null, WriteBox)
        })
      }
    }
  ]
})
