import React, { Component } from 'react'
import s from '../Post/Post.scss'
import { isHot, isValidPhoto } from '../Toools'
import TickTime from '../Post/TickTime'

import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'

import { blue300, indigo900 } from 'material-ui/styles/colors'
import styles from './styles'
console.log(styles)
class Comment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isHot: isHot(this.props.created_at),
      deleted: false
    }
  }

  render () {
    let { text, created_at, id, isYourPage } = this.props
    if (!this.state.deleted) {
      return (
        <div>
          <Chip style={styles.chip} labelStyle={styles.label}
            onRequestDelete={
              isYourPage
                ? this.removeComment.bind(this, id)
                : undefined}>
            {this.avatar()}
            <span className={s.commentTime}>
              <TickTime time={created_at} />
            </span>
            {text}
          </Chip>
        </div>
      )
    }
    return null
  }

  removeComment (id) {
    this.props.removeComment(id)
    this.setState({deleted: true})
  }

  avatar () {
    let { user } = this.props
    const photo =
      user && user.photo
      ? user.photo
      : false
    if (user && user.photo) {
      return (
        <Avatar
          style={styles.avatar}
          src={isValidPhoto(photo)}
          color={blue300} backgroundColor={indigo900} />
      )
    }
    return null
  }
}

export default Comment
