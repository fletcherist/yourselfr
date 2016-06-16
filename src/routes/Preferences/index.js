export default (store) => ({
  'path': '/preferences',
  getComponent (nextState, cb) {
    require.ensure([], require => {
      var PreferencesContainer = require('components/Preferences/Container');
      cb(null, PreferencesContainer);
    });
  },
  indexRoute: {
    getComponent (nextState, cb) {
      require.ensure([], require => {
        var Preferences = require('components/Preferences');
        cb(null, Preferences);
      });
    }
  },
  childRoutes: [
    {
      path: 'photos',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          var Photos = require('components/Preferences/Photos');
          cb(null, Photos);
        })
      }
    },
    {
      path: 'social',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          var SocialNetworks = require('components/Preferences/UpdateSocialNetworks');
          cb(null, SocialNetworks);
        })
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
