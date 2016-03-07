import React from 'react';
import s from './SocialNetworks.scss';
import cx from 'classnames';

import vkPic from '../SocialButtons/vk.svg';
import twitterPic from '../SocialButtons/twitter.svg';
import instagramPic from '../SocialButtons/instagram.png';
import tumblrPic from '../SocialButtons/tumblr.svg';

class SocialNetworks extends React.Component {
  propTypes () {
    return {
      networks: React.PropTypes.object.isRequired
    }
  }
  render () {
    console.log(this.props.networks);
    var { vk, twitter, tumblr, instagram } = this.props.networks;
    return (
      <div className={cx('container--left padding-0', s.social)}>
          {vk && (
            <div>
              <a href={`http://vk.com/${vk}`}>
                <img src={vkPic}/>
                <span>{vk}</span>
              </a>
            </div>
          )}
          {twitter && (
            <div>
              <a href={`http://twitter.com/${twitter}`} target='_blank'>
                <img src={twitterPic}/>
                <span>{twitter}</span>
              </a>
            </div>
          )}
          {tumblr && (
            <div>
              <a href={`${tumblr}`} target='_blank'>
                <img src={tumblrPic}/>
                <span>{tumblr}</span>
              </a>
            </div>
          )}
          {instagram && (
            <div>
              <a href={`http://instagram.com/${instagram}`} target='_blank'>
                <img src={instagramPic}/>
                <span>{instagram}</span>
              </a>
            </div>
          )}
      </div>
    )
  }
}

export default SocialNetworks;
