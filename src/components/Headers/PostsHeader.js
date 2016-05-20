import React, { Component, PropTypes } from 'react';
import { ending, blurRoot, hideBlocks } from '../Toools';
import WriteBox from '../WriteBox';
import s from './Headers.scss';

class PostsHeader extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired
  };

  componentWillMount () {
    this.setState({
      isOpen: false
    })
  }

  toggleModalBox () {
    if (this.state.isOpen) {
      this.setState({isOpen: false})
      hideBlocks(false);
      blurRoot(false);
    } else {
      this.setState({isOpen: true})
      hideBlocks(true);
      blurRoot(true);
    }
  }

  render () {
    var {count, username} = this.props;
    var postsPronounce = ending(count, ['мнение', 'мнения', 'мнений']);
    if (!username) {
      username = 'Пользователь';
    }
    return (
      <div className={s.blockTitle}>
        <div className={s.postsUser}>
          <span className={s.navLink}>{username}</span>
          <span className={s.separator}></span>
          <span className={s.navItem}>{count} {postsPronounce}</span>
        </div>
        <span className={s.blockTitleRight} onClick={this.toggleModalBox.bind(this)}>Оставить своё мнение</span>
        <WriteBox
          isOpen={this.state.isOpen}
          toggleModalBox={this.toggleModalBox.bind(this)}
        />
      </div>
    )
  }
}

export default PostsHeader;
