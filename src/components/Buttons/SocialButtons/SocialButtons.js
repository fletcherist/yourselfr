import React from 'react'
import s from './SocialButtons.scss'
import { Link } from 'react-router'
// import vkWhite from './vkint.svg'
// import twitter from './twitter_white.svg'
// import facebook from './facebook.svg'
import Translate from 'react-translate-component'

import RaisedButton from 'material-ui/RaisedButton'

const ui = {
  white: 'white',
  margin: '10px',
  vk: '#4C75A3',
  twitter: '#00acec'
}
export const VkAuthButton = () => (
  <a href='http://yoursel.fr/auth/vk'>
    <RaisedButton
      fullWidth
      backgroundColor={ui.vk}
      style={{color: ui.white, marginBottom: ui.margin}}>
      <Translate content='socialButtons.authViaVK' component='span' />
    </RaisedButton>
  </a>
)

export const TwitterAuthButton = () => (
  <a href='http://yoursel.fr/auth/twitter'>
    <RaisedButton
      fullWidth
      backgroundColor={ui.twitter}
      style={{color: ui.white, marginBottom: ui.margin}}>
      <Translate content='socialButtons.authViaTwitter' component='span' />
    </RaisedButton>
  </a>
)

export const FacebookAuthButton = () => (
  <a href='http://yoursel.fr/auth/facebook'>
    <RaisedButton
      fullWidth
      backgroundColor={ui.twitter}
      className={s.button}>
      <Translate content='socialButtons.authViaFb' component='span' />
    </RaisedButton>
  </a>
)

export const AuthWithEmail = () => (
  <Link to='/signup'>
    <RaisedButton
      fullWidth
      style={{marginBottom: ui.margin}}>
      <Translate content='socialButtons.authViaEmail' component='span' />
    </RaisedButton>
  </Link>
)

export const Auth = () => (
  <Link to='/login'>
    <RaisedButton
      fullWidth>
      <Translate content='login.button' component='span' />
    </RaisedButton>
  </Link>
)

export const AuthPack = () => (
  <div>
    <VkAuthButton />
    <AuthWithEmail />
    <Auth />
  </div>
)
