import { push } from 'react-router-redux';

export default store => ({
  path: '/signup',
  getComponent (nextState, cb) {
    require([], require => {
      const AuthBootstrap = require('../AuthBootstrap').AuthBootstrap;
      cb(null, AuthBootstrap);
    });
  },
  indexRoute: {
    getComponent (nextState, cb) {
      require.ensure([], require => {
        const Signup = require('../AuthBootstrap').Signup;
        var auth = store.getState().auth;
        if (auth.authenticated) {
          return store.dispatch(push(`/${auth.user.alias}`));
        }
        return cb(null, Signup);
      })
    }
  }
});
