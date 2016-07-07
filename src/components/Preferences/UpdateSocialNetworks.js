import React, { Component, PropTypes } from 'react';
import s from './UpdateSocialNetworks.scss';
import x from '../Preferences/Preferences';
import { connect } from 'react-redux';
import cx from 'classnames';
import classNames from 'classnames/bind';

import vkPicture from 'components/Buttons/SocialButtons/vk.svg';
import twitterPicture from 'components/Buttons/SocialButtons/twitter.svg';
import instagramPicture from 'components/Buttons/SocialButtons/instagram.png';
import tumblrPicture from 'components/Buttons/SocialButtons/tumblr.svg';
import facebookPicture from 'components/Buttons/SocialButtons/facebook.svg';

import { LoaderSmall } from '../Loader';

import { actions } from 'store/modules/socialNetworks';
let c = classNames.bind(x);

class UpdateSocialNetworks extends Component {
  static propTypes = {
    isFetching: PropTypes.object,
    vk: PropTypes.string,
    twitter: PropTypes.string,
    tumblr: PropTypes.string,
    instagram: PropTypes.string,

    updateVK: PropTypes.func.isRequired,
    updateTumblr: PropTypes.func.isRequired,
    updateTwitter: PropTypes.func.isRequired,
    updateInstagram: PropTypes.func.isRequired,
    updateFacebook: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      vk: this.props.vk,
      twitter: this.props.twitter,
      tumblr: this.props.tumblr,
      instagram: this.props.instagram
    };
  }

  componentWillReceiveProps (props) {
    this.setState({
      vk: props.vk,
      twitter: props.twitter,
      tumblr: props.tumblr,
      instagram: props.instagram
    })
  }
  handleVK () {
    this.props.updateVK(this.vk.value);
  }
  handleTumblr () {
    this.props.updateTumblr(this.tumblr.value);
  }
  handleTwitter () {
    this.props.updateTwitter(this.twitter.value);
  }
  handleInstagram () {
    this.props.updateInstagram(this.instagram.value);
  }
  handleFacebook () {
    this.props.updateFacebook(this.facebook.value);
  }
  handleChange (name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
  }
  render () {
    const { isFetching } = this.props;
    return (
      <div>
        <h3>Социальные сети</h3>
        <div className={cx(s.innerAddon, s.leftAddon)}>
          <input ref={(r) => this.vk = r} placeholder='вконтакте' value={this.state.vk}
            className={c({
              'input': true,
              fetchingForms: isFetching.vk.status,
              formError: isFetching.vk.state === false,
              formSuccess: isFetching.vk.state === true
            })}
            onChange={this.handleChange.bind(this, 'vk')}
            onBlur={this.handleVK.bind(this)} />
          <img src={vkPicture} />
          <div className={s.rightAddon}>
            {isFetching.vk.status && (
              <LoaderSmall />
            )}
          </div>
        </div>
        <div className={cx(s.innerAddon, s.leftAddon)}>
          <input ref={(r) => this.tumblr = r} placeholder='тамблер' value={this.state.tumblr}
            className={c({
              'input': true,
              fetchingForms: isFetching.tumblr.status,
              formError: isFetching.tumblr.state === false,
              formSuccess: isFetching.tumblr.state === true
            })}
            onChange={this.handleChange.bind(this, 'tumblr')}
            onBlur={this.handleTumblr.bind(this)} />
          <img src={tumblrPicture} />
          <div className={s.rightAddon}>
            {isFetching.tumblr.status && (
              <LoaderSmall />
            )}
          </div>
        </div>
        <div className={cx(s.innerAddon, s.leftAddon)}>
          <input ref={(r) => this.twitter = r} placeholder='твиттер' value={this.state.twitter}
            className={c({
              'input': true,
              fetchingForms: isFetching.twitter.status,
              formError: isFetching.twitter.state === false,
              formSuccess: isFetching.twitter.state === true
            })}
            onChange={this.handleChange.bind(this, 'twitter')}
            onBlur={this.handleTwitter.bind(this)} />
          <img src={twitterPicture} />
          <div className={s.rightAddon}>
            {isFetching.twitter.status && (
              <LoaderSmall />
            )}
          </div>
        </div>
        <div className={cx(s.innerAddon, s.leftAddon)}>
          <input ref={(r) => this.instagram = r} placeholder='инстаграм' value={this.state.instagram}
            className={c({
              'input': true,
              fetchingForms: isFetching.instagram.status,
              formError: isFetching.instagram.state === false,
              formSuccess: isFetching.instagram.state === true
            })}
            onChange={this.handleChange.bind(this, 'instagram')}
            onBlur={this.handleInstagram.bind(this)} />
          <img src={instagramPicture} />
          <div className={s.rightAddon}>
            {isFetching.instagram.status && (
              <LoaderSmall />
            )}
          </div>
        </div>
        <div className={cx(s.innerAddon, s.leftAddon)}>
          <input ref={(r) => this.facebook = r} placeholder='фейсбук' value={this.state.facebook}
            className={c({
              'input': true,
              fetchingForms: isFetching.facebook.status,
              formError: isFetching.facebook.state === false,
              formSuccess: isFetching.facebook.state === true
            })}
            onChange={this.handleChange.bind(this, 'facebook')}
            onBlur={this.handleFacebook.bind(this)} />
          <img src={facebookPicture} />
          <div className={s.rightAddon}>
            {isFetching.facebook.status && (
              <LoaderSmall />
            )}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    isFetching: state.isFetching.socialNetworks,
    vk: state.auth.user.social.vk,
    twitter: state.auth.user.social.twitter,
    tumblr: state.auth.user.social.tumblr,
    instagram: state.auth.user.social.instagram,
    facebook: state.auth.user.social.facebook
  }
}

export default connect(mapStateToProps, actions)(UpdateSocialNetworks);
