import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import s from '../Subscriptions.scss';
import { Link } from 'react-router'

import { loadUser } from '../../../store/modules/user';
import { loadFollowing } from '../../../store/modules/followers'
import { isValidPhoto, isEmpty, arraysEqual } from '../../Toools';
import { config } from '../../../store/config';
import Loader from '../../Loader';
import SubscribeButton from '../../SubscribeButton';
import FollowingHeader from '../../Headers/FollowingHeader';
import NoFollowing from 'components/NoData/NoFollowing';

class Following extends Component {
  static propTypes = {
    following: PropTypes.array.isRequired,
    loadFollowing: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };

  componentWillMount () {
    this.props.loadFollowing();
  }

  componentWillUpdate (nextProps) {
    return !arraysEqual(this.props.following, nextProps.following)
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
            <div style={{background: `url(${config.http}/upload/background_cropped/${following.background})`}}
              className={s.background}>
            </div>
            <div className={s.subscription}>
              <Link to={linkHref}>
                <img
                  src={photo}
                  className={s.photo}
                  onClick={() => loadUser(following.alias)} />
              </Link>
              <div className={s.info}>
                <div className={s.left_info}>
                  <Link
                    to={linkHref}
                    onClick={() => loadUser(following.alias)}
                    className={s.username}>{following.username}
                  </Link>
                  <div className={s.alias}>
                    @{following.alias}
                  </div>
                </div>
                {isAuthenticated && !myPageInList && (
                  <div className={s.SubscribeButton}>
                    <SubscribeButton
                      alias={following.alias}
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
        <FollowingHeader alias={this.props.user.alias} username={this.props.user.username} />
        {this.props.isFetching && (
          <Loader />
        )}
        {!this.props.isFetching && (
          <div>
            {followingList && (
              followingList
            )}
            {!followingList && (
              <NoFollowing username={this.props.user.username} />
            )}
          </div>
        )}
      </div>
    )
  }
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
