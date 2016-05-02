import React, { Component, PropTypes } from 'react';
import s from './SocialNetworks.scss';
import cx from 'classnames';
import classNames from 'classnames/bind';

import vkPic from 'components/Buttons/SocialButtons/vk.svg';
import twitterPic from 'components/Buttons/SocialButtons/twitter.svg';
import instagramPic from 'components/Buttons/SocialButtons/instagram.png';
import tumblrPic from 'components/Buttons/SocialButtons/tumblr.svg';

let c = classNames.bind(s);

class SocialNetworks extends Component {
  static propTypes = {
    networks: PropTypes.object
  };

  shouldComponentUpdate (nextProps) {
    // return nextProps.networks.vk !== this.props.networks.vk
    return true;
  }
  render () {
    var ifSocial = false;
    if (this.props.networks) {
      const networks = this.props;
      if (networks.vk || networks.twitter || networks.tumblr || networks.instagram) {
        ifSocial = true;
        var { vk, twitter, tumblr, instagram } = networks;
      }
    }
    if (ifSocial) {
      return (
        <div className={cx('container--left', s.social)}>
          <a href={`http://vk.com/${vk}`} target='_blank'>
            <img src={vkPic} className={c({
              inactive: !vk
            })}/>
          </a>
          <a href={`http://twitter.com/${twitter}`} target='_blank'>
            <img src={twitterPic} className={c({
              inactive: !twitter
            })}/>
          </a>
          <a href={`${tumblr}`} target='_blank'>
            <img src={tumblrPic} className={c({
              inactive: !tumblr
            })}/>
          </a>
          <a href={`http://instagram.com/${instagram}`} target='_blank'>
            <img src={instagramPic} className={c({
              inactive: !instagram
            })}/>
          </a>
        </div>
      )
    } else {
      return (null)
    }
  }
}

export default SocialNetworks;
