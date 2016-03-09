import React from 'react';
import s from './SocialButtons.scss';
import cx from 'classnames';
import vkWhite from './vkint.svg';
import Translate from 'react-translate-component';

const VkAuthButton = () => {
  return (
      <div className={cx(s.button, s.vk)}>
        <a href='auth/vk'>
          <img src={vkWhite}/>
          <Translate content='socialButtons.authViaVK' component='span'/>
        </a>
      </div>
  )
}

export default VkAuthButton;
