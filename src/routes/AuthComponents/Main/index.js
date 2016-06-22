export default store => ({
  path: '/',
  getComponent (nextState, cb) {
    require([], require => {
      const AuthBootstrap = require('../AuthBootstrap').AuthBootstrap;
      cb(null, AuthBootstrap);
    });
  },
  indexRoute: {
    getComponent (nextState, cb) {
      require.ensure([], require => {
        const Main = require('./Main').default;
        cb(null, Main);
      });
    }
  }
});
