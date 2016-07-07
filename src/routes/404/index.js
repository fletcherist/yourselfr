export default store => ({
  path: '/404',
  getComponent (nextState, cb) {
    require.ensure([], require => {
      var p404 = require('./containers/404').default;
      cb(null, p404);
    }, '404');
  }
});
