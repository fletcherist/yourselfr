import React from 'react';
// import {ending} from '../toools';
import {connect} from 'react-redux';
import s from './Followers.scss';
// import {actions as followersActions} from '../../redux/modules/followers';
import { Link } from 'react-router'

import { loadUser } from '../../redux/modules/user';
import { loadFollowing } from '../../redux/modules/followers'
import { isValidPhoto, isEmpty } from '../Toools';

class Following extends React.Component {
    componentWillMount () {
      this.props.loadFollowing();
    }
    render () {
      const loadUser = this.props.loadUser.bind(this);

      var followingList;
      if (!isEmpty(this.props.following)) {
        var following = this.props.following;
        followingList = following.map(function (following) {
          var photo = isValidPhoto(following.photo);
          var linkHref = '/' + following.alias;
          return (
            <div key={following._id}>
                <div style={{background: 'url(http://localhost/upload/background/' + following.background + ')'}}
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
                  <Link
                    className={s.username}>{following.username}
                  </Link>
                </div>
              </div>
            </div>
          )
        });
      } else {
        followingList = 'No following';
      }
      return (
        <div className='container--right'>
          {followingList}
        </div>
      )
    }
}

Following.propTypes = {
  following: React.PropTypes.array.isRequired,
  loadFollowing: React.PropTypes.func.isRequired,
  loadUser: React.PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    following: state.subscriptions.following
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadFollowing: () => dispatch(loadFollowing()),
    loadUser: (alias) => dispatch(loadUser(alias))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Following);