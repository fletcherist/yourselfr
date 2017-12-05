import React, { Component, PropTypes } from 'react'
import s from './Post.scss'
import { isValidPhoto } from '../Toools'
import { Link } from 'react-router'
import { config } from 'store/config'

class UserAvatar extends Component {
  static propTypes = {
    photo: React.PropTypes.string.isRequired,
    alias: React.PropTypes.string.isRequired,
    loadUser: PropTypes.func.isRequired
  };

  shouldComponentUpdate () {
    return true
  }

  render () {
    var photo = isValidPhoto(this.props.photo)
    if (photo.match(/upload\/avatar/)) photo = `${config.http}/upload/default-avatar/10.jpg`
    if (photo.match(/yoursel/)) photo = `${config.http}/upload/default-avatar/10.jpg`
    console.log('match', photo.match(/yoursel/))
    var styles = {
      link: {
        border: '0px'
      }
    }
    const { alias, loadUser } = this.props
    return (
      <div className={s.time} style={{marginRight: '15px'}}>
        <Link to={`/${alias}`} style={styles.link} onClick={() => loadUser(alias)}>
          <img
            src={photo}
            className={s.photo} />
        </Link>
      </div>
    )
  }
}

export default UserAvatar
