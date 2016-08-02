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
      path: '*',
      getComponent (nextState, cb) {
        cb(null)
      }
    }
  ]
})
