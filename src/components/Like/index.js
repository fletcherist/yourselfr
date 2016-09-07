import Like from './Like'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { likePost } from 'store/modules/posts'

export default connect(
  state => ({}),
  dispatch => bindActionCreators({
    likePost
  }, dispatch)
)(Like)
