import { authenticate } from 'store/modules/auth'
import { loadUser } from 'store/modules/user'

export default (store) => ({
  'path': '/preferences',
  getComponent (nextState, cb) {
    require.ensure([], require => {
      var PreferencesContainer = require('components/Preferences/Container').default
      if (store.getState().user.isLoaded === false) {
        store.dispatch(authenticate())
        .then(response => store.dispatch(loadUser()))
        .then(
          response => cb(null, PreferencesContainer),
          error => console.log(error)
        )
      } else {
        cb(null, PreferencesContainer)
      }
    }, 'preferences_container')
  },
  indexRoute: {
    getComponent (nextState, cb) {
      require.ensure([], require => {
        var Preferences = require('components/Preferences').default
        cb(null, Preferences)
      }, 'preferences_general')
    }
  },
  childRoutes: [
    {
      path: 'photos',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          var Photos = require('components/Preferences/Photos').default
          cb(null, Photos)
        }, 'preferences_photos')
      }
    },
    {
      path: 'social',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          var SocialNetworks = require('components/Preferences/UpdateSocialNetworks').default
          cb(null, SocialNetworks)
        }, 'preferences_social')
      }
    }
  ]
})
