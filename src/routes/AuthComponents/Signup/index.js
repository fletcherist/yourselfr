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
        cb(null, Signup);
      })
    }
  }
});
