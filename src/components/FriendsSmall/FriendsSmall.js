import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import s from './Friends.scss'
import { loadFriends } from '../../store/modules/friends'
import { shuffle } from '../Toools'
import cookie from 'react-cookie'

class Friends extends Component {
  static propTypes = {
    friends: PropTypes.array
  };
  componentWillMount () {
    var closeFriends = cookie.load('closeFriends')
    this.setState({closed: closeFriends || false})
    if (!this.props.friends && closeFriends !== false) {
      this.props.loadFriends()
    }
  }

  shouldComponentUpdate () {
    if (this.props.friends && this.props.friends.length > 0) {
      return false
    }
    return true
  }

  refresh () {
    this.forceUpdate()
  }

  close () {
    cookie.remove('closeFriends', { path: '/' })
    cookie.save('closeFriends', true, { path: '/' })
    this.setState({closed: true})
  }

  render () {
    var user1 = ''
    var user2 = ''
    var user3 = ''
    console.log(this.props.friends)
    if (this.props.friends.length > 2) {
      var { friends } = this.props
      friends = shuffle(friends)
      user1 = friends[0]
      user2 = friends[1]
      user3 = friends[2]
    } else {
      return (null)
    }

    if (this.state.closed) {
      return (null)
    } else {
      return (
        <div className='container--left'>
          <div className={s.title}>Друзья на Йорселфере</div>
          <div onClick={() => this.refresh()} className={s.refresh}></div>
          <div onClick={() => this.close()} className={s.remove}></div>
          <div className={s.flex}>
            <Link to={`${user1.alias}`}>
              <div style={{background: `url(${user1.photo})`}}
                className={s.avatar}></div>
            </Link>
            <Link to={`${user2.alias}`}>
              <div style={{background: `url(${user2.photo})`}}
                className={s.avatar}></div>
            </Link>
            <Link to={`${user3.alias}`}>
              <div style={{background: `url(${user3.photo})`}}
                className={s.avatar}>
              </div>
            </Link>
          </div>
        </div>
      )
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
    loadFriends: () => dispatch(loadFriends())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Friends)
