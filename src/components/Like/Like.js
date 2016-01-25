import React from 'react';
import classNames from 'classnames/bind';
import s from './Like.scss';

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
  }
  render () {
    var classes = cx({
      button: true,
      inactive: !this.state.active,
      active: this.state.active
    });
    return (
      <div className={s.like} onClick={this.toggle.bind(this)}>
        <div className={classes}></div>
        <div className={s.count}>
          {this.state.count}
        </div>
      </div>
    );
  }
}

Like.propTypes = {
  count: React.PropTypes.number,
  object: React.PropTypes.string.isRequired
}

export default Like;
