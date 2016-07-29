export default store => ({
  path: '/i/get-socialized',
  getComponent (nextState, cb) {
    require.ensure([], require => {
      const GetSocialized = require('./GetSocialized').default
      cb(null, GetSocialized)
    }, 'GetSocialized')
  }
})
