import React, { Component, PropTypes } from 'react';
import { ending, hideBlocks } from '../Toools';
import WriteBox from '../WriteBox';
import s from './Headers.scss';
import { Link } from 'react-router';

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
      hideBlocks(false);
    } else {
      this.setState({isOpen: true})
      hideBlocks(true);
    }
  }

  render () {
    var {count, username, alias} = this.props;
    var postsPronounce = ending(count, ['мнение', 'мнения', 'мнений']);
    if (!username) {
      username = 'Пользователь';
    }
    return (
      <div className={s.blockTitle}>
        <div className={s.postsUser}>
          <Link to={`/${alias}`} className={s.navLink}>{username}</Link>
          <span className={s.separator}></span>
          <span className={s.navItem}>{count} {postsPronounce}</span>
        </div>
        <span className={s.blockTitleRight} onClick={this.toggleModalBox.bind(this)}>Оставить мнение</span>
        <WriteBox
          isOpen={this.state.isOpen}
          toggleModalBox={this.toggleModalBox.bind(this)}
        />
      </div>
    )
  }
}

export default PostsHeader;
