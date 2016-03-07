import React from 'react';
import s from './UpdateSocialNetworks.scss';
import { connect } from 'react-redux';
import cx from 'classnames';

import vk from '../SocialButtons/vk.svg';
import twitter from '../SocialButtons/twitter.svg';
import instagram from '../SocialButtons/instagram.png';
import tumblr from '../SocialButtons/tumblr.svg';

import { saveSocialNetworks } from '../../redux/modules/preferences';

class UpdateSocialNetworks extends React.Component {
  updateVK () {

  }

  updateTumblr () {

  }

  updateTwitter () {

  }

  updateInsta () {

  }
  render () {
    return (
      <div>
        <h3>Социальные сети</h3>
        <div className={cx(s.innerAddon, s.leftAddon)}>
          <input className={s.input} ref={(r) => this.vk = r} placeHolder='вконтакте'/>
          <img src={vk}/>
        </div>
        <div className={cx(s.innerAddon, s.leftAddon)}>
          <input className={s.input} ref={(r) => this.tumblr = r} placeHolder='тамблер'/>
          <img src={tumblr}/>
        </div>
        <div className={cx(s.innerAddon, s.leftAddon)}>
          <input className={s.input} ref={(r) => this.twitter = r} placeHolder='твиттер'/>
          <img src={twitter}/>
        </div>
        <div className={cx(s.innerAddon, s.leftAddon)}>
          <input className={s.input} ref={(r) => this.instagram = r} placeHolder='инстаграм'/>
          <img src={instagram}/>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    isFetching: state.isFetching.socialNetworks,
    social: state.auth.user.social
  }
}

function mapDispatchToProps (dispatch) {
  return {
    saveSocialNetworks: (networks) => dispatch(saveSocialNetworks(networks))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateSocialNetworks);
