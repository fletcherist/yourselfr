import { PropTypes } from 'react'
import { connect } from 'react-redux'
import { subscribe } from 'store/modules/user'
import SubscribeButton from './SubscribeButton'
SubscribeButton.propTypes = {
  alias: PropTypes.string.isRequired,
  subscribe: PropTypes.func.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  updateCounters: PropTypes.bool
}
const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
  subscribe: (alias, updateCounters) => dispatch(subscribe(alias, updateCounters))
})
export default connect(mapStateToProps, mapDispatchToProps)(SubscribeButton)
