import React from 'react';
import {connect} from 'react-redux';
import s from '../Subscriptions.scss';
import { Link } from 'react-router'

import { loadUser } from '../../../redux/modules/user';
import { loadFollowing } from '../../../redux/modules/followers'
import { isValidPhoto, isEmpty } from '../../Toools';
import { config } from '../../../redux/config';
import Loader from '../../Loader';
import SubscribeButton from '../../SubscribeButton';

class Following extends React.Component {
    componentWillMount () {
      this.props.loadFollowing();
    }
    render () {
      const loadUser = this.props.loadUser.bind(this);
      const isAuthenticated = this.props.auth.authenticated;
      const myUserId = this.props.auth.user._id;

      var followingList;
      if (!isEmpty(this.props.following)) {
        var following = this.props.following;
        followingList = following.map(function (following) {
          var photo = isValidPhoto(following.photo);
          var linkHref = '/' + following.alias;
          const myPageInList = following._id === myUserId;
          return (
            <div key={following._id} className={s.subContainer}>
                <div style={{background: `url(${config.http}/upload/background/${following.background})`}}
                  className={s.background}>
                </div>
              <div className={s.subscription}>
                <Link to={linkHref}>
                  <img
                    src={photo}
                    className={s.photo}
                    onClick={ () => loadUser(following.alias) }/>
                </Link>
                <div className={s.info}>
                  <div className={s.left_info}>
                    <Link
                      to={linkHref}
                      onClick={ () => loadUser(following.alias)}
                      className={s.username}>{following.username}
                    </Link>
                    <div className={s.alias}>
                      @{following.alias}
                    </div>
                  </div>
                  {isAuthenticated && !myPageInList && (
                    <div className={s.SubscribeButton}>
                      <SubscribeButton
                        alias={ following.alias }
                        isFollowing
                        updateCounters={false}
                      />
                    </div>
                  )}
                </div>
              </div>
              {!following.background && (
                <div className={s.borderBottom}></div>
              )}
            </div>
          )
        });
      } else {
        followingList = '';
      }
      return (
        <div className='container--right padding-0 container--subscriptions'>
        <FollowingHeader
          alias={this.props.user.alias}
          username={this.props.user.username}
        />
          {this.props.isFetching && (
            <Loader/>
          )}
          {!this.props.isFetching && (
            <div>
              {followingList && (
                followingList
              )}
              {!followingList && (
                <NoFollowing username={this.props.user.username}/>
              )}
            </div>
          )}
        </div>
      )
    }
}

const FollowingHeader = ({alias, username}) => {
  return (
    <div className='blockTitle'>
      <Link to={`/${alias}`} className='navLink'>{username}</Link>
      <span className='separator'></span>
      <span className='navItem'>Подписки</span>
    </div>
  )
}

class NoFollowing extends React.Component {
  render () {
    return (
        <div className={s.noSubscriptions}>{this.props.username} пока ни на кого <br/> не подписался</div>
    )
  }
}

NoFollowing.propTypes = {
  username: React.PropTypes.object
}

Following.propTypes = {
  following: React.PropTypes.array.isRequired,
  loadFollowing: React.PropTypes.func.isRequired,
  loadUser: React.PropTypes.func.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  user: React.PropTypes.object.isRequired,
  auth: React.PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    following: state.subscriptions.following,
    isFetching: state.isFetching.following,
    user: state.user,
    auth: state.auth
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadFollowing: () => dispatch(loadFollowing()),
    loadUser: (alias) => dispatch(loadUser(alias))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Following);
