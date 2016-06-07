import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import s from './Friends.scss';
import { loadFriends } from '../../store/modules/friends';
import { loadUser } from '../../store/modules/user';
import { shuffle } from '../Toools';
import cookie from 'react-cookie';

class Friends extends Component {
  static propTypes = {
    friends: PropTypes.array,
    loadFriends: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired
  };
  componentWillMount () {
    var closeFriends = cookie.load('closeFriends');
    this.setState({closed: closeFriends || false})
    this.props.loadFriends();
  }

  refresh () {
    this.forceUpdate();
  }

  close () {
    cookie.remove('closeFriends', { path: '/' });
    cookie.save('closeFriends', true, { path: '/' });
    this.setState({closed: true})
  }

  render () {
    var user1 = '';
    var user2 = '';
    var user3 = '';
    const { loadUser } = this.props;
    if (this.props.friends[0] && this.props.friends[1] && this.props.friends[2]) {
      var { friends } = this.props;
      friends = shuffle(friends);
      user1 = friends[0];
      user2 = friends[1];
      user3 = friends[2];
    } else {
      return (null);
    }

    if (this.state.closed) {
      return (null);
    } else {
      return (
        <div className='container--left'>
          <div className={s.title}>Друзья на Йорселфере</div>
          <div onClick={() => this.refresh()} className={s.refresh}></div>
          <div onClick={() => this.close()} className={s.remove}></div>
          <div className={s.flex}>
            <Link to={`${user1.alias}`} onClick={() => loadUser(user1.alias)}><div style={{background: `url(${user1.photo})`}} className={s.avatar}></div></Link>
            <Link to={`${user2.alias}`} onClick={() => loadUser(user2.alias)}><div style={{background: `url(${user2.photo})`}} className={s.avatar}></div></Link>
            <Link to={`${user3.alias}`} onClick={() => loadUser(user3.alias)}><div style={{background: `url(${user3.photo})`}} className={s.avatar}></div></Link>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    friends: state.friends
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadUser: (alias) => dispatch(loadUser(alias)),
    loadFriends: () => dispatch(loadFriends())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Friends);
