import React from 'react';
import s from './SocialButtons.scss';
import cx from 'classnames';
// import vkWhite from './vkint.svg';
// import twitter from './twitter_white.svg';
// import facebook from './facebook.svg';
import Translate from 'react-translate-component';

export const VkAuthButton = () => (
  <div className={cx(s.button, s.vk)}>
    <a href='http://yoursel.fr/auth/vk'>
      <Translate content='socialButtons.authViaVK' component='span' />
    </a>
  </div>
);

export const TwitterAuthButton = () => (
  <div className={cx(s.button, s.twitter)}>
    <a href='http://yoursel.fr/auth/twitter'>
      <Translate content='socialButtons.authViaTwitter' component='span' />
    </a>
  </div>
)

export const FacebookAuthButton = () => (
  <div className={cx(s.button, s.facebook)}>
    <a href='http://yoursel.fr/auth/facebook'>
      <Translate content='socialButtons.authViaFb' component='span' />
    </a>
  </div>
);

export const AuthWithEmail = () => (
  <div className={cx(s.button, s.email)}>
    <a href='http://yoursel.fr/login'>
      <Translate content='socialButtons.authViaEmail' component='span' />
    </a>
  </div>
)

export const AuthPack = () => (
  <div>
    <VkAuthButton />
    <TwitterAuthButton />
    <AuthWithEmail />
  </div>
)
