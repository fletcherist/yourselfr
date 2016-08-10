import React, { Component, PropTypes } from 'react'
// import classNames from 'classnames/bind'
import s from './Like.scss'
import { connect } from 'react-redux'
import { likePost } from '../../store/modules/posts'

import Favorite from 'material-ui/svg-icons/action/favorite'
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border'

import { palette } from 'store/config'

// let cx = classNames.bind(s)

class Like extends Component {
  static propTypes = {
    count: PropTypes.number,
    object: PropTypes.string.isRequired,
    likePost: PropTypes.func.isRequired,
    isLiked: PropTypes.bool,
    type: PropTypes.string.isRequired
  };
  constructor (props) {
    super(props)
    this.state = {
      active: this.props.isLiked || false,
      count: this.props.count || 0,
      object: this.props.object
    }
  }

  toggle () {
    var diff = 0
    if (this.state.active === false) {
      diff = 1
    } else {
      diff = -1
    }
    this.setState({
      active: !this.state.active,
      count: this.state.count + diff
    })
    this.props.likePost(this.state.object, this.props.type)
  }
  render () {
    // var classes = cx({
    //   button: true,
    //   inactive: !this.state.active,
    //   active: this.state.active || this.props.isLiked
    // })

    var active = this.state.active
      ? <Favorite style={{
        color: palette.yoColor
      }} />
      : <FavoriteBorder style={{
        color: palette.yoColor
      }} />

    return (
      <div className={s.like} onClick={this.toggle.bind(this)}>
        <div className={s.count}>
          {this.state.count > 0 && (
             this.state.count
          )}
        </div>
        {active}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {
    likePost: (id, type) => dispatch(likePost(id, type))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Like)
