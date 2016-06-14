import { injectReducer } from '../../store/reducers';

export default (store) => ({
  'path': 'user',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const User = require('components/User').default;

      // injectReducer(store, {key: 'user'});
      cb(null, User);
    }, 'user');
  }
});
