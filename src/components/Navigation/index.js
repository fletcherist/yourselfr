import Navigation from './Navigation'
import { connect } from 'react-redux'
import { loadUser } from '../../store/modules/user'

export default connect(
  state => ({
    isAuthenticated: state.auth.authenticated,
    user: state.auth.user
  }),
  dispatch => ({
    loadUser: (alias) => dispatch(loadUser(alias))
  }))(Navigation)
