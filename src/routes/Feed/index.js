import { authenticate } from 'store/modules/auth';
import { loadUser } from 'store/modules/user';
export default store => ({
  path: 'feed',
  getComponent (nextState, cb) {
    require.ensure([], require => {
      var Feed = require('components/Feed').default;
      var authenticated = store.getState().auth.authenticated;
      if (authenticated) {
        if (store.getState().user.isLoaded === false) {
          store.dispatch(authenticate())
          .then(response => store.dispatch(loadUser()))
          .then(
            response => cb(null, Feed),
            error => console.log(error)
          )
        } else {
          cb(null, Feed)
        }
      } else {
        window.location.href = '/';
      }
    }, 'feed');
  }
});
