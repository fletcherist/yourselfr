import { PropTypes } from 'react'
import Posts from './Posts'
import { connect } from 'react-redux'
import { actions as postsActions } from 'store/modules/posts'

Posts.propTypes = {
  count: PropTypes.number.isRequired,
  posts: PropTypes.array.isRequired,
  loadPosts: PropTypes.func.isRequired,
  loadNewPosts: PropTypes.func.isRequired,
  loadMorePosts: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isFetchingLoadMore: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  alias: PropTypes.string.isRequired,
  isYourPage: PropTypes.bool.isRequired
}

function mapStateToProps (state) {
  return {
    posts: state.posts,
    count: state.user.stats.posts,
    isAuthenticated: state.auth.authenticated,
    isYourPage: state.auth.isYourPage,
    isFetching: state.isFetching.posts,
    isFetchingLoadMore: state.isFetching.loadMorePosts,
    username: state.user.username,
    alias: state.user.alias
  }
}
export default connect(mapStateToProps, postsActions)(Posts)
