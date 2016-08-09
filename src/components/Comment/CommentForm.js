import React, { Component, PropTypes } from 'react'
import s from './CommentForm.scss'
// import cx from 'classnames'
import { connect } from 'react-redux'
import { postComment } from '../../store/modules/comments'

import TextField from 'material-ui/TextField'
import Reply from '../Reply'
import IconButton from 'material-ui/IconButton'

class CommentForm extends Component {
  static propTypes = {
    postComment: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired
  };
  constructor () {
    super()
    this.state = {
      selected: false,
      value: ''
    }
  }

  handleChange (e) {
    console.log(e.target.value)
    this.setState({
      value: e.target.value
    })
    var selected = this.state.value.length > 0
    this.setState({selected: selected})
  }

  postComment () {
    this.props.postComment(this.input.value, this.props.postId)
    this.input.value = ''
  }
  render () {
    return (
      <div className={s.form}>
        <TextField
          floatingLabelText='Что на это скажешь?'
          ref={(r) => this.input = r}
          onChange={this.handleChange.bind(this)}
          value={this.state.value}
          multiLine
        />
        {this.renderReply()}
      </div>
    )
  }

  renderReply () {
    if (this.state.selected) {
      return (
        <div className={s.actions}>
          <IconButton>
            <Reply
              onClick={this.postComment.bind(this)}
            />
          </IconButton>
        </div>
      )
    }
    return null
  }
}

const mapStateToProps = (state) => {
  return {
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    postComment: (text, postId) => dispatch(postComment(text, postId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)
