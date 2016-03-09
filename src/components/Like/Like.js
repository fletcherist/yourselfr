import React from 'react';
import classNames from 'classnames/bind';
import s from './Like.scss';
import { connect } from 'react-redux';
import { likePost } from '../../redux/modules/posts';

let cx = classNames.bind(s);

class Like extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      active: false,
      count: this.props.count,
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
    this.props.likePost(this.state.object);
  }
  render () {
    var classes = cx({
      button: true,
      inactive: !this.state.active,
      active: this.state.active
    });
    return (
      <div style={{float: 'right'}}>
        <div className={s.like} onClick={this.toggle.bind(this)}>
          <div className={s.count}>
            {this.state.count > 0 && (
               this.state.count
            )}
          </div>
          <div className={classes}></div>
        </div>
      </div>
    );
  }
}

Like.propTypes = {
  count: React.PropTypes.number,
  object: React.PropTypes.string.isRequired,
  likePost: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    lol: 'lol'
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    likePost: (id) => dispatch(likePost(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Like);
