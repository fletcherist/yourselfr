import React from 'react';
import s from './Profile.scss';
import { Link } from 'react-router';
import Counters from '../Counters';
import {connect} from 'react-redux';
import Loader from '../Loader';

import UserNavigation from '../UserNavigation';
import SocialNetworks from '../SocialNetworks';

import { isValidPhoto, isNotEmptyString } from '../Toools';
import { config } from '../../redux/config';

import {actions as userActions} from '../../redux/modules/user';
import onlinePic from './online.png';

class Profile extends React.Component {
  componentWillMount () {
    this.props.loadUser();
  }
    render () {
      console.log(this.props);
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
            {this.props.isFetching.status && (
              <Loader/>
            )}
            {this.props.isFetching.status === false && (
              <div>
                <div style={{background: `url(${config.http}/upload/background/${this.props.background})`}} className={s.background}></div>
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
                      <img className={s.online} src={onlinePic} width='12x'></img>
                    )}
                </h1>
                <Counters
                  visits={this.props.stats.visits}
                  followers={this.props.stats.followers}
                  following={this.props.stats.following}
                  alias={this.props.alias}
                />
              </div>
            )}
        </div>

        <StatusBox status={this.props.status}/>
        {ifSocial && (
          <SocialNetworks networks={this.props.social}/>
        )}
        {this.props.isAuthenticated &&
          // <div className='button button--subscribe'>подписаться</div>
          <UserNavigation alias={this.props.alias}/>
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
  online: React.PropTypes.object,
  status: React.PropTypes.string,
  social: React.PropTypes.object.isRequired,
  stats: React.PropTypes.shape({
    visits: React.PropTypes.number.isRequired,
    followers: React.PropTypes.number.isRequired,
    following: React.PropTypes.number.isRequired
  }),
  loadUser: React.PropTypes.func.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
  isFetching: React.PropTypes.object.isRequired
};

function mapStateToProps (state) {
  return {
    username: state.user.username,
    alias: state.user.alias,
    photo: state.user.photo,
    background: state.user.background,
    online: state.user.online,
    status: state.user.status,
    stats: state.user.stats,
    social: state.user.social,
    isAuthenticated: state.auth.authenticated,
    isFetching: state.isFetching.user
  }
}

export default connect(mapStateToProps, userActions)(Profile);
