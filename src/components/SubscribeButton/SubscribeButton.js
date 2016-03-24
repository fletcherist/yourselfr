import React from 'react';
import { connect } from 'react-redux';
import { subscribe } from '../../redux/modules/user';
import s from './SubscribeButton.scss';
import classNames from 'classnames/bind';

let cx = classNames.bind(s);

class SubscribeButton extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isFollowing: this.props.isFollowing
    }
  }
  subscribe () {
    this.props.subscribe(this.props.alias);
    this.setState({
      isFollowing: !this.state.isFollowing
    })
  }
  render () {
    return (
      <div>
        <div
            className={cx({
              subscribe: true,
              follow: !this.state.isFollowing,
              following: this.state.isFollowing
            })}
            onClick={ () => this.subscribe() }>
          {this.state.isFollowing === true && (
            'Отписаться'
          )}
          {this.state.isFollowing === false && (
            'Подписаться'
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
    isFollowing: state.user.isFollowing,
    isFetching: state.isFetching.subscribe
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    subscribe: (alias) => dispatch(subscribe(alias))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeButton);
