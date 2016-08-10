import React, { Component, PropTypes } from 'react'
import { isEmpty } from '../Toools'
import { connect } from 'react-redux'
import { removeComment } from 'store/modules/comments'
import Comment from '../Comment'

class Comments extends Component {
  static propTypes = {
    comments: PropTypes.array,
    isYourPage: PropTypes.bool.isRequired,
    removeComment: PropTypes.func.isRequired
  };
  shouldComponentUpdate (nextProps) {
    // if (nextProps.comments.length === 0) {
    //   return false
    // }
    // if (arraysEqual(nextProps.comments, this.props.comments)) {
    //   return false
    // }
    return true
  }

  render () {
    var comments = this.props.comments
    const { isYourPage, removeComment } = this.props
    if (comments && !isEmpty(comments) && Array.isArray(comments)) {
      return (
        <div>
          {comments.map(function (comment) {
            return (
              <Comment
                key={comment._id}
                id={comment._id}
                isYourPage={isYourPage}
                removeComment={removeComment}
                {...comment}
              />)
          })}
        </div>
      )
    } else {
      return (null)
    }
  }
}

const mapStateToProps = (state) => {
  return {
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    removeComment: (id) => dispatch(removeComment(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
