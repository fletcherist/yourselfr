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
    this.setState({
      value: e.target.value
    })
    var selected = this.state.value.length > 0
    this.setState({selected: selected})
  }

  postComment () {
    this.props.postComment(this.state.value, this.props.postId)
    console.log(this.input)
    this.setState({value: '', selected: false})
    this.forceUpdate()
  }
  render () {
    return (
      <div className={s.form}>
        <TextField
          hintText='Что на это скажешь?'
          ref={(r) => this.input = r}
          onChange={this.handleChange.bind(this)}
          value={this.state.value}
        />
        {this.renderReply()}
      </div>
    )
  }

  renderReply () {
    if (this.state.selected) {
      return (
        <div
          className={s.actions}
          onClick={this.postComment.bind(this)}>
          <IconButton>
            <Reply />
          </IconButton>
        </div>
      )
    }
    return null
  }
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({
  postComment: (text, postId) => dispatch(postComment(text, postId))
})
export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)
