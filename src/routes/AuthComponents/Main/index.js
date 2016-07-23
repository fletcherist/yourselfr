import { push } from 'react-router-redux'

export default store => ({
  path: '/',
  getComponent (nextState, cb) {
    require([], require => {
      const AuthBootstrap = require('../AuthBootstrap').AuthBootstrap
      cb(null, AuthBootstrap)
    })
  },
  indexRoute: {
    getComponent (nextState, cb) {
      require.ensure([], require => {
        const Main = require('./Main').default
        var auth = store.getState().auth
        if (auth.authenticated) {
          return store.dispatch(push(`/${auth.user.alias}`))
        }
        return cb(null, Main)
      })
    }
  }
})
