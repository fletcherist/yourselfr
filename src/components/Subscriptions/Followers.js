import Subscription from './Subscription'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'

export default connect(
  state => ({
    subscriptions: state.subscriptions.followers,
    isFetching: state.isFetching.followers,
    auth: state.auth,
    user: state.user
  }),
  dispatch => (bindActionCreators({
    push
  }, dispatch))
)(Subscription)
