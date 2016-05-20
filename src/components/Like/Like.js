import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import s from './Like.scss';
import { connect } from 'react-redux';
import { likePost } from '../../redux/modules/posts';

let cx = classNames.bind(s);

class Like extends Component {
  static propTypes = {
    count: PropTypes.number,
    object: PropTypes.string.isRequired,
    likePost: PropTypes.func.isRequired,
    isLiked: PropTypes.bool,
    type: PropTypes.string.isRequired
  };
  constructor (props) {
    super(props);
    this.state = {
      active: this.props.isLiked || false,
      count: this.props.count || 0,
      object: this.props.object
    }
  }

  toggle () {
    var diff = 0;
    if (this.state.active === false) {
      diff = 1;
    } else {
      diff = -1;
    }
    this.setState({
      active: !this.state.active,
      count: this.state.count + diff
    })
    this.props.likePost(this.state.object, this.props.type);
    console.log(this.props);
  }
  render () {
    var classes = cx({
      button: true,
      inactive: !this.state.active,
      active: this.state.active || this.props.isLiked
    });
    return (
      <div className={s.like} onClick={this.toggle.bind(this)}>
        <div className={s.count}>
          {this.state.count > 0 && (
             this.state.count
          )}
        </div>
        <div className={classes}></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {
    likePost: (id, type) => dispatch(likePost(id, type))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Like);
