import React, { Component, PropTypes } from 'react';
import Counters from '../Counters';
import {connect} from 'react-redux';

import { Avatar, Username, Status } from './Elements';
import SubscribeButton from '../SubscribeButton';
import SocialNetworks from '../SocialNetworks';
import Footer from '../Footer';
import Navigation from '../Navigation';
import Megaphone from '../Megaphone';
import AttachEmail from '../AttachEmail';
import Friends from '../Friends';

import { actions as userActions } from '../../store/modules/user';

class Profile extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    alias: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    background: PropTypes.string,
    online: PropTypes.bool,
    isYourPage: PropTypes.bool.isRequired,
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

  // shouldComponentUpdate (nextProps) {
    // return nextProps.alias !== this.props.alias;
  // }

  componentWillMount () {
    // this.props.loadUser();
    document.body.style.minHeight = '101vh';
  }
  componentWillUnmount () {
    document.body.style.minHeight = '400px';
  }
  render () {
    document.title = `${this.props.username} — Йорселфер`;

    const { username, alias, photo, status, online, stats, isFollowing, social } = this.props;
    return (
      <div>
        <div className='container--left padding-0 container--transparent container--user' id='profile'>
          <Navigation />
          <Avatar photo={photo} alias={alias} />
          <Username online={online} username={username} />
          <Status status={status} />
          {alias !== this.props.me.alias && (
            <SubscribeButton
              alias={alias}
              isFollowing={isFollowing}
              updateCounters
            />
          )}
          <Counters
            visits={stats.visits}
            followers={stats.followers}
            following={stats.following}
            alias={alias}
          />
        </div>
        <SocialNetworks networks={social} />
        {this.props.isYourPage && (
          <div>
            <Megaphone alias={alias} username={username} />
            <Friends />
          </div>
        )}
        <div className='hide-on-mobile'>
          <Footer />
        </div>
      </div>)
  }
}

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
    isYourPage: state.auth.isYourPage,
    isFollowing: state.user.isFollowing,

    me: state.auth.user
  }
}

export default connect(mapStateToProps, userActions)(Profile);
