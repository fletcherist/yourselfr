import Counters from './Counters'
import { connect } from 'react-redux'

const props = (state) => {
  console.log(state)
  return {
    visits: state.user.stats.visits,
    followers: state.user.stats.followers,
    following: state.user.stats.following,
    alias: state.user.alias
  }
}
console.log('hssss')
export default connect(props)(Counters)
