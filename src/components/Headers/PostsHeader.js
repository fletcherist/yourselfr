import React, { Component, PropTypes } from 'react';
<<<<<<< HEAD
import { ending, blurRoot, hideBlocks } from '../Toools';
import WriteBox from '../WriteBox';
import s from './Headers.scss';
import { Link } from 'react-router';
=======
import { ending, blurRoot } from '../Toools';
import WriteBox from '../WriteBox';
import s from './Headers.scss';
>>>>>>> origin/master

class PostsHeader extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
<<<<<<< HEAD
    username: PropTypes.string.isRequired,
    alias: PropTypes.string.isRequired
=======
    username: PropTypes.string.isRequired
>>>>>>> origin/master
  };

  componentWillMount () {
    this.setState({
      isOpen: false
    })
  }

  toggleModalBox () {
    if (this.state.isOpen) {
      this.setState({isOpen: false})
<<<<<<< HEAD
      hideBlocks(false);
      // blurRoot(false);
    } else {
      this.setState({isOpen: true})
      hideBlocks(true);
      // blurRoot(true);
=======
      blurRoot(false);
    } else {
      this.setState({isOpen: true})
      blurRoot(true);
>>>>>>> origin/master
    }
  }

  render () {
<<<<<<< HEAD
    var {count, username, alias} = this.props;
=======
    var {count, username} = this.props;
>>>>>>> origin/master
    var postsPronounce = ending(count, ['мнение', 'мнения', 'мнений']);
    if (!username) {
      username = 'Пользователь';
    }
    return (
      <div className={s.blockTitle}>
        <div className={s.postsUser}>
<<<<<<< HEAD
          <Link to={`/${alias}`} className={s.navLink}>{username}</Link>
          <span className={s.separator}></span>
          <span className={s.navItem}>{count} {postsPronounce}</span>
        </div>
        <span className={s.blockTitleRight} onClick={this.toggleModalBox.bind(this)}>Оставить мнение</span>
        <WriteBox
          isOpen={this.state.isOpen}
          toggleModalBox={this.toggleModalBox.bind(this)}
=======
          <span className={s.navLink}>{username}</span>
          <span className={s.separator}></span>
          <span className={s.navItem}>{ count } {postsPronounce}</span>
        </div>
        <span className={s.blockTitleRight} onClick={ this.toggleModalBox.bind(this) }>Оставить своё мнение</span>
        <WriteBox
          isOpen={this.state.isOpen}
          toggleModalBox={ this.toggleModalBox.bind(this) }
>>>>>>> origin/master
        />
      </div>
    )
  }
}

export default PostsHeader;
