import { injectReducer } from '../../store/reducers';

import { loadUser } from '../../store/modules/user';
export default (store) => ({
  'path': ':user',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const User = require('components/User').default;
      const reducer = require('../../store/modules/user').default;
      injectReducer(store, {key: 'user', reducer});

      store.dispatch(loadUser())
        .then(
           result => { cb(null, User) },
           error => { cb(null, User) }
        );
    }, 'user');
  },
  childRoutes: [
    followers,
    following
  ]
});

// const getData = () => {
//   return dispatch => {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve();
//       });
//     });
//   }
// }

const followers = {
  'path': 'followers',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Followers = require('components/Subscriptions/Followers').default;
      cb(null, Followers);
    })
  }
}

const following = {
  'path': 'following',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Following = require('components/Subscriptions/Following').default;
      cb(null, Following);
    });
  }
}
//
// {
//   path: ':user',
//   component: ,
//   indexRoute: {
//     component: Posts
//   },
//   childRoutes: [
//     {
//       path: 'followers',
//       indexRoute: {
//         component: Followers
//       }
//     },
//     {
//       path: 'following',
//       indexRoute: {
//         component: Following
//       }
//     }
//   ]
// }
