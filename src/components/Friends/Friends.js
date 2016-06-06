import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router';
import s from './Friends.scss';
import { actions as friendsActions } from '../../redux/modules/user';

class Friends extends Component {
  static propTypes = {
    friends: PropTypes.array,
    loadFriends: PropTypes.func.isRequired
  };
  componentWillMount () {
    this.props.loadFriends();
  }

  render () {
    return (
      <div className='container--left'>
        <div className={s.title}>Друзья на Йорселфере</div>
        <div className={s.flex}>
          <div className={s.avatar}></div>
          <div className={s.avatar}></div>
          <div className={s.avatar}></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    friends: state.friends
  }
}
export default connect(mapStateToProps, friendsActions)(Friends);
