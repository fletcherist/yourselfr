import React, { Component, PropTypes } from 'react'
import s from './SocialNetworks.scss'
import cx from 'classnames'
import classNames from 'classnames/bind'
import { formatSocialNetworks } from '../Toools'

import vkPic from 'components/Buttons/SocialButtons/vk.svg'
import twitterPic from 'components/Buttons/SocialButtons/twitter.svg'
import instagramPic from 'components/Buttons/SocialButtons/instagram.png'
import tumblrPic from 'components/Buttons/SocialButtons/tumblr.svg'
import facebookPic from 'components/Buttons/SocialButtons/facebook.svg'

let c = classNames.bind(s)
class SocialNetworks extends Component {
  constructor (props) {
    super(props)

    this.state = {
      networks: props.networks
    }
  }
  static propTypes = {
    networks: PropTypes.object
  }

  componentWillReceiveProps (props) {
    this.setState({
      networks: props.networks
    })
  }

  // componentWillUpdate (nextProps) {
  //   if (nextProps.networks && this.props.networks) {
  //     var current = nextProps.networks
  //     var old = this.props.networks
  //     if (current.vk !== old.vk ||
  //         current.twitter !== old.twitter ||
  //         current.tumblr !== old.tumblr ||
  //         current.instagram !== old.instagram ||
  //         current.facebook !== old.facebook) {
  //       return true
  //     }
  //   }
  //   return false
  // }
  render () {
    var ifSocial = false

    var networks = this.state.networks
    if (networks) {
      if (networks.vk || networks.twitter ||
         networks.tumblr || networks.instagram || networks.facebook) {
        ifSocial = true
        networks = formatSocialNetworks(networks)
        var { vk, twitter, tumblr, instagram, facebook } = networks
      }
    }
    if (ifSocial) {
      return (
        <div className={cx(s.social, 'container--left')}>
          <a href={`http://vk.com/${vk}`} target='_blank'>
            <img src={vkPic} className={c({inactive: !vk})} />
          </a>
          <a href={`http://twitter.com/${twitter}`} target='_blank'>
            <img src={twitterPic} className={c({inactive: !twitter})} />
          </a>
          <a href={`${tumblr}`} target='_blank'>
            <img src={tumblrPic} className={c({inactive: !tumblr})} />
          </a>
          <a href={`http://instagram.com/${instagram}`} target='_blank'>
            <img src={instagramPic} className={c({inactive: !instagram})} />
          </a>
          <a href={`http://facebook.com/${facebook}`} target='_blank'>
            <img src={facebookPic} className={c({inactive: !facebook})} />
          </a>
        </div>
      )
    } else {
      return (null)
    }
  }
}

export default SocialNetworks
