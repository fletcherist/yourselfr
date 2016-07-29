export default store => ({
  path: '/i/get-personalized',
  getComponent (nextState, cb) {
    require.ensure([], require => {
      const GetPersonalized = require('./GetPersonalized').default
      console.log(GetPersonalized)
      cb(null, GetPersonalized)
    }, 'GetPersonalized')
  }
})
