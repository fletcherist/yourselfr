import React, { Component, PropTypes } from 'react';
import s from './CommentForm.scss';
import cx from 'classnames';
import { connect } from 'react-redux';
import { postComment } from '../../store/modules/comments';

class CommentForm extends Component {
  static propTypes = {
    postComment: PropTypes.func.isRequired,
    post_id: PropTypes.string.isRequired
  };
  constructor () {
    super();
    this.state = {
      selected: false
    }
  }
  focus () {
    this.setState({
      selected: true
    })
  }
  blur () {
    setTimeout(() => {
      this.setState({
        selected: false
      })
    }, 200);
  }

  postComment () {
    this.props.postComment(this.input.value, this.props.post_id);
    this.input.value = '';
  }
  render () {
    return (
      <div className={s.form} onFocus={() => this.focus()} onBlur={() => this.blur()}>
        <input className={cx('input', s.input)} placeholder='Написать комментарий..'
              ref={(r) => this.input = r}/>
        {this.state.selected && (
          <div className={s.button} onClick={ this.postComment.bind(this) }>Отправить</div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    postComment: (text, post_id) => dispatch(postComment(text, post_id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
