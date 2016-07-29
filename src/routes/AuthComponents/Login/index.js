import { push } from 'react-router-redux'

export default store => ({
  path: '/login',
  getComponent (nextState, cb) {
    require([], require => {
      const AuthBootstrap = require('../AuthBootstrap').AuthBootstrap
      cb(null, AuthBootstrap)
    })
  },
  indexRoute: {
    getComponent (nextState, cb) {
      require.ensure([], require => {
        const Login = require('../AuthBootstrap').Login
        var auth = store.getState().auth
        if (auth.authenticated) {
          return store.dispatch(push(`/${auth.user.alias}`))
        }
        return cb(null, Login)
      })
    }
  }
})
