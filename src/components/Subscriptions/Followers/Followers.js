import React from 'react';
import {connect} from 'react-redux';
import s from '../Subscriptions.scss';
import { Link } from 'react-router'

import { loadUser } from '../../../redux/modules/user';
import { loadFollowers } from '../../../redux/modules/followers'
import { isValidPhoto, isEmpty } from '../../Toools';
import { config } from '../../../redux/config';
import Loader from '../../Loader';

class Followers extends React.Component {
    componentWillMount () {
      this.props.loadFollowers();
    }
    render () {
      const loadUser = this.props.loadUser.bind(this);

      var followersList;
      if (!isEmpty(this.props.followers)) {
        var followers = this.props.followers;
        followersList = followers.map(function (follower) {
          var photo = isValidPhoto(follower.photo);
          var linkHref = '/' + follower.alias;
          return (
            <div key={follower._id} className={s.subContainer}>
                <div style={{background: `url(${config.http}/upload/background/${follower.background})`}}
                  className={s.background}>
                </div>
              <div className={s.subscription}>
                <Link to={linkHref}>
                  <img
                    src={photo}
                    className={s.photo}
                    onClick={ () => loadUser(follower.alias) }/>
                </Link>
                <div className={s.info}>
                  <Link
                    to={linkHref}
                    onClick={ () => loadUser(follower.alias)}
                    className={s.username}>{follower.username}
                  </Link>
                  <div className={s.alias}>
                    @{follower.alias}
                  </div>
                </div>
              </div>
            </div>
          )
        });
      } else {
        followersList = undefined
      }

      return (
        <div className='container--right padding-0 container--subscriptions'>
          <FollowersHeader
            alias={this.props.user.alias}
            username={this.props.user.username}
          />
          {this.props.isFetching && (
            <Loader/>
          )}
          {!this.props.isFetching && (
            <div>
              {followersList && (
                followersList
              )}
              {!followersList && (
                <NoFollowers/>
              )}
            </div>
          )}
        </div>
      )
    }
}

const FollowersHeader = ({alias, username}) => {
  return (
    <div className={s.blockTitle}>
      <Link to={`/${alias}`} className={s.navLink}>{username}</Link>
      <span className={s.separator}></span>
      <span className={s.navItem}>Подписчики</span>
    </div>
  )
}

class NoFollowers extends React.Component {
  render () {
    return (
      <div className={s.noSubscriptions}>Пока нет ни одного<br/> подписчика</div>
    )
  }
}

Followers.propTypes = {
  followers: React.PropTypes.array.isRequired,
  loadFollowers: React.PropTypes.func.isRequired,
  loadUser: React.PropTypes.func.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  user: React.PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    followers: state.subscriptions.followers,
    isFetching: state.isFetching.followers,
    user: state.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadFollowers: () => dispatch(loadFollowers()),
    loadUser: (alias) => dispatch(loadUser(alias))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Followers);
