// import { injectReducer } from '../../store/reducers';

import { loadUser } from 'store/modules/user';
import { loadFollowers, loadFollowing } from 'store/modules/followers';
import { loadFriends } from 'store/modules/friends';

export default (store) => ({
  'path': ':user',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const User = require('./containers/User').default;
      // const reducer = require('../../store/modules/user').default;
      // injectReducer(store, {key: 'user', reducer});

      var currentAlias = store.getState().user.alias;
      var alias = window.location.pathname.substr(1).split('/')[0];

      if (currentAlias === alias) {
        return cb(null, User);
      }
      store.dispatch(loadUser())
        .then(
           result => { cb(null, User) },
           error => { window.location.href = '/404'}
        );
    }, 'user');
  },
  indexRoute: {
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        const Posts = require('components/Posts').default;
        cb(null, Posts);
      }, 'posts')
    }
  },
  childRoutes: [
    {
      'path': 'followers',
      getComponent (nextState, cb) {
        require.ensure([], (require) => {
          const Followers = require('components/Subscriptions/Followers').default;

          store.dispatch(loadFollowers())
            .then(
              result => cb(null, Followers)
            );
        }, 'followers');
      }
    },
    {
      'path': 'following',
      getComponent (nextState, cb) {
        require.ensure([], (require) => {
          const Following = require('components/Subscriptions/Following').default;

          store.dispatch(loadFollowing())
            .then(
              result => cb(null, Following)
            );
        }, 'following');
      }
    },
    {
      path: 'friends',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          const Friends = require('components/Subscriptions/Friends').default;
          store.dispatch(loadFriends())
            .then(
              result => cb(null, Friends)
            );
        })
      }
    }
  ]
});
