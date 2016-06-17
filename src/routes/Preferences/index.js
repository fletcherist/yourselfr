import { authenticate } from '../../store/modules/auth';
import { loadUser } from '../../store/modules/user';
export default (store) => ({
  'path': '/preferences',
  getComponent (nextState, cb) {
    require.ensure([], require => {
      var PreferencesContainer = require('components/Preferences/Container').default;

      store.dispatch(authenticate())
      .then(response => store.dispatch(loadUser()))
      .then(
        response => {
          setTimeout(() => {
            cb(null, PreferencesContainer)
          }, 1000);
        },
        error => console.log(error)
      )
    }, 'preferences_container');
  },
  indexRoute: {
    getComponent (nextState, cb) {
      require.ensure([], require => {
        var Preferences = require('components/Preferences').default;
        Promise.all([store.dispatch(authenticate()), store.dispatch(loadUser())])
        .then(
          response => cb(null, Preferences)
        )
      }, 'preferences_general');
    }
  },
  childRoutes: [
    {
      path: 'photos',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          var Photos = require('components/Preferences/Photos').default;
          Promise.all([store.dispatch(authenticate()), store.dispatch(loadUser())])
          .then(
            response => cb(null, Photos)
          )
        }, 'preferences_photos')
      }
    },
    {
      path: 'social',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          var SocialNetworks = require('components/Preferences/UpdateSocialNetworks').default;
          Promise.all([store.dispatch(authenticate()), store.dispatch(loadUser())])
          .then(
            response => cb(null, SocialNetworks)
          )
        }, 'preferences_social')
      }
    }
  ]
});

// {
//   path: '/preferences',
//   component: PreferencesContainer,
//   indexRoute: {
//     component: Preferences
//   },
//   childRoutes: [
//     {
//       path: 'photos',
//       indexRoute: {
//         component: PreferencesPhotos
//       }
//     },
//     {
//       path: 'social',
//       indexRoute: {
//         component: UpdateSocialNetworks
//       }
//     }
//   ]
// },
