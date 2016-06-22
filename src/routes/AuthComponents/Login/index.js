export default store => ({
  path: '/login',
  getComponent (nextState, cb) {
    require([], require => {
      const AuthBootstrap = require('../AuthBootstrap').AuthBootstrap;
      cb(null, AuthBootstrap);
    });
  },
  indexRoute: {
    getComponent (nextState, cb) {
      require.ensure([], require => {
        const Login = require('../AuthBootstrap').Login;
        cb(null, Login);
      });
    }
  }
});
