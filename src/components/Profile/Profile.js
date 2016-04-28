import React, { Component, PropTypes } from 'react';
import s from './Profile.scss';
import { Link } from 'react-router';
import Counters from '../Counters';
import {connect} from 'react-redux';

import SubscribeButton from '../SubscribeButton';
import SocialNetworks from '../SocialNetworks';
import StatusBox from './StatusBox';

import { isValidPhoto } from '../Toools';

import {actions as userActions} from '../../redux/modules/user';
import onlinePic from './online.png';

class Profile extends Component {
  constructor (props) {
    super(props);
    this.props.loadUser();
  }

  componentDidMount () {
    document.body.style.minHeight = '101vh';
  }
  componentWillUnmount () {
    document.body.style.minHeight = '400px';
  }
    render () {
      document.title = `${this.props.username} — Йорселфер`;

      var ifSocial = false;
      if (this.props.social) {
        if (this.props.social.vk || this.props.social.twitter || this.props.social.tumblr || this.props.social.instagram) {
          ifSocial = true;
        }
      }
      var photo = isValidPhoto(this.props.photo);
      return (
        <div>
          <div className='container--left padding-0 container--transparent container--user'>
              <div>
                <div className={s.avatar}>
                    <Link to={`/${this.props.alias}`}>
                        <img src={photo}/>
                    </Link>
                </div>
                <h1 className={s.username}>
                    <span>
                        {this.props.username}
                    </span>
                    {this.props.online === true && (
                      <img className={s.online} src={onlinePic}></img>
                    )}
                </h1>
                {this.props.alias !== this.props.me.alias && (
                  <SubscribeButton
                    alias={this.props.alias}
                    isFollowing={this.props.isFollowing}
                    updateCounters
                  />
                )}
                <Counters
                  visits={this.props.stats.visits}
                  followers={this.props.stats.followers}
                  following={this.props.stats.following}
                  alias={this.props.alias}
                />
              </div>
        </div>

        <StatusBox status={this.props.status}/>
        {ifSocial && (
          <SocialNetworks networks={this.props.social}/>
        )}
        {this.props.isAuthenticated &&
          <div>
          </div>
        }
      </div>)
    }
}

Profile.propTypes = {
  username: PropTypes.string.isRequired,
  alias: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  background: PropTypes.string,
  online: PropTypes.bool,
  status: PropTypes.string,
  social: PropTypes.object,
  stats: PropTypes.shape({
    visits: PropTypes.number.isRequired,
    followers: PropTypes.number.isRequired,
    following: PropTypes.number.isRequired
  }),
  loadUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isFetching: PropTypes.object.isRequired,
  isFollowing: PropTypes.bool.isRequired,

  me: PropTypes.object
};

function mapStateToProps (state) {
  return {
    username: state.user.username,
    alias: state.user.alias,
    photo: state.user.photo,
    background: state.user.background,
    online: state.user.online.status,
    status: state.user.status,
    stats: state.user.stats,
    social: state.user.social,
    isAuthenticated: state.auth.authenticated,
    isFetching: state.isFetching.user,
    isYourProfile: state.auth.isYourProfile,
    isFollowing: state.user.isFollowing,

    me: state.auth.user
  }
}

export default connect(mapStateToProps, userActions)(Profile);
