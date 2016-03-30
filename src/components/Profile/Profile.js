import React from 'react';
import s from './Profile.scss';
import { Link } from 'react-router';
import Counters from '../Counters';
import {connect} from 'react-redux';

import SubscribeButton from '../SubscribeButton';
import SocialNetworks from '../SocialNetworks';

import { isValidPhoto, isNotEmptyString } from '../Toools';
// import { config } from '../../redux/config';

import {actions as userActions} from '../../redux/modules/user';
import onlinePic from './online.png';

// import avatar from './avatar.jpg'

class Profile extends React.Component {
  constructor (props) {
    super(props);
    this.props.loadUser();
  }
  // componentWillMount () {
    // this.props.loadUser();
  // }
  componentDidMount () {
    document.body.style.minHeight = '101vh';
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
      console.log('asdasd', this.props.isFollowing);
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
                  <div style={{marginTop: '20px'}}>
                    <SubscribeButton
                      alias={this.props.alias}
                      isFollowing={this.props.isFollowing}
                      updateCounters
                    />
                  </div>
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

class StatusBox extends React.Component {
  render () {
    var isStatus = isNotEmptyString(this.props.status);
    return (
      <div>
        { isStatus && (
          <div className='container--left'>
            <div className={s.status}>
              {this.props.status}
            </div>
          </div>
        )}
      </div>
    );
  }
}

StatusBox.propTypes = {
  status: React.PropTypes.string.isRequired
}

Profile.propTypes = {
  username: React.PropTypes.string.isRequired,
  alias: React.PropTypes.string.isRequired,
  photo: React.PropTypes.string.isRequired,
  background: React.PropTypes.string,
  online: React.PropTypes.bool,
  status: React.PropTypes.string,
  social: React.PropTypes.object,
  stats: React.PropTypes.shape({
    visits: React.PropTypes.number.isRequired,
    followers: React.PropTypes.number.isRequired,
    following: React.PropTypes.number.isRequired
  }),
  loadUser: React.PropTypes.func.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
  isFetching: React.PropTypes.object.isRequired,
  isFollowing: React.PropTypes.bool.isRequired,

  me: React.PropTypes.object
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
