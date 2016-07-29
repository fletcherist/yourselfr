import React, { Component, PropTypes } from 'react'
import s from './Post.scss'
import { isValidPhoto } from '../Toools'
import { Link } from 'react-router'

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
