import React from 'react';
import { connect } from 'react-redux';
import { subscribe } from '../../redux/modules/user';
import s from './SubscribeButton.scss';
import classNames from 'classnames/bind';

let cx = classNames.bind(s);

class SubscribeButton extends React.Component {
  subscribe () {
    this.props.subscribe(this.props.alias);
  }
  render () {
    console.log(this.props.isFollowing);
    return (
      <div>
        <div
            className={cx({
              'button': true,
              subscribe: true,
              follow: !this.props.isFollowing,
              following: this.props.isFollowing
            })}
            onClick={ () => this.subscribe() }>
          {this.props.isFollowing === true && (
            'подписки'
          )}
          {this.props.isFollowing === false && (
            'подписаться'
          )}
        </div>
      </div>
    );
  }
}

SubscribeButton.propTypes = {
  alias: React.PropTypes.string.isRequired,
  subscribe: React.PropTypes.func.isRequired,
  isFollowing: React.PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    alias: state.user.alias,
    isFollowing: state.user.isFollowing
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    subscribe: (alias) => dispatch(subscribe(alias))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeButton);
