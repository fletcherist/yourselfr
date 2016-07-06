export default store => ({
  path: 'feed',
  getComponent (nextState, cb) {
    require.ensure([], require => {
      var Feed = require('components/Feed').default;
      var authenticated = store.getState().auth.authenticated;
      if (authenticated) {
        cb(null, Feed);
      } else {
        window.location.href = '/';
      }
    }, 'feed');
  }
});
