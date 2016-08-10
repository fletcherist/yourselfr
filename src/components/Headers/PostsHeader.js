import React, { Component, PropTypes } from 'react'
// import { ending } from '../Toools'
import WriteBox from '../WriteBox'
import s from './Headers.scss'

class PostsHeader extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    alias: PropTypes.string.isRequired
  };

  componentWillMount () {
    this.setState({
      isOpen: false
    })
  }

  toggleModalBox () {
    if (this.state.isOpen) {
      this.setState({isOpen: false})
    } else {
      this.setState({isOpen: true})
    }
  }

  render () {
    // var {count, username} = this.props
    // var postsPronounce = ending(count, ['мнение', 'мнения', 'мнений'])
    // if (!username) {
    //   username = 'Пользователь'
    // }
    return (
      <div className={s.blockTitlePosts}>
        <WriteBox />
      </div>
    )
  }
}

export default PostsHeader
