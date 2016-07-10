import React from 'react';
import s from './SocialButtons.scss';
import cx from 'classnames';
import vkWhite from './vkint.svg';
import twitter from './twitter_white.svg';
import facebook from './facebook.svg';
import Translate from 'react-translate-component';

export const VkAuthButton = () => (
  <a href='http://yoursel.fr/auth/vk'>
    <div className={cx(s.button, s.vk)}>
      <img src={vkWhite} />
      <Translate content='socialButtons.authViaVK' component='span' />
    </div>
  </a>
)

export const TwitterAuthButton = () => (
  <a href='http://yoursel.fr/auth/twitter'>
    <div className={cx(s.button, s.twitter)}>
      <img src={twitter} />
      <Translate content='socialButtons.authViaTwitter' component='span' />
    </div>
  </a>
)

export const FacebookAuthButton = () => (
  <a href='http://yoursel.fr/auth/facebook'>
    <div className={cx(s.button, s.facebook)}>
      <img src={facebook} />
      <Translate content='socialButtons.authViaFb' component='span' />
    </div>
  </a>
)

export const AuthPack = () => (
  <div>
    <VkAuthButton />
    <TwitterAuthButton />
    <FacebookAuthButton />
  </div>
)
