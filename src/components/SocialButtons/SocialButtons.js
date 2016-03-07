import React from 'react';
import s from './SocialButtons.scss';
import cx from 'classnames';
import vkWhite from './vk_white.png';

const VkAuthButton = () => {
  return (
      <div className={cx(s.button, s.vk)}>
        <a href='auth/vk'>
          <img src={vkWhite}/>
          <span>Войти через вконтакте</span>
        </a>
      </div>
  )
}

export default VkAuthButton;
