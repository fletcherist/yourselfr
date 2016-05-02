import React, { Component, PropTypes } from 'react';
import { ending } from '../Toools';
import WriteBox from '../WriteBox';
import s from './Headers.scss';

class PostsHeader extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired
  };

  componentWillMount () {
    this.setState({
      show: false
    })
  }

  openModalBox () {
    this.setState({show: !this.state.show})
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
          <span className={s.navItem}>{ count } {postsPronounce}</span>
        </div>
        <span className={s.blockTitleRight} onClick={ this.openModalBox.bind(this) }>Оставить своё мнение</span>
        <WriteBox show={this.state.show}/>
      </div>
    )
  }
}

export default PostsHeader;
