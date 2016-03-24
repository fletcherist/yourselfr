import React from 'react';
import s from './SocialNetworks.scss';
import cx from 'classnames';
import classNames from 'classnames/bind';

import vkPic from '../SocialButtons/vk.svg';
import twitterPic from '../SocialButtons/twitter.svg';
import instagramPic from '../SocialButtons/instagram.png';
import tumblrPic from '../SocialButtons/tumblr.svg';

let c = classNames.bind(s);

class SocialNetworks extends React.Component {
  render () {
    var { vk, twitter, tumblr, instagram } = this.props.networks;
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
  }
}

SocialNetworks.propTypes = () => {
  return {
    networks: React.PropTypes.object.isRequired
  }
}

export default SocialNetworks;
