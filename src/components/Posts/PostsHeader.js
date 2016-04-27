import React, { Component, PropTypes } from 'react';
import { ending } from '../toools';
import WriteBox from '../WriteBox';

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
    setTimeout(() => {
      this.setState({show: !this.state.show})
    }, 300);
  }

  render () {
    var {count, username} = this.props;
    var postsPronounce = ending(count, ['мнение', 'мнения', 'мнений']);
    if (!username) {
      username = 'Пользователь';
    }
    return (
      <div className='blockTitle'>
        <div className='postsUser'>
          <span className='navLink'>{username}</span>
          <span className='separator'></span>
          <span className='navItem'>{ count } {postsPronounce}</span>
        </div>
        <span className='blockTitle--right' onClick={ this.openModalBox.bind(this) }>Оставить своё мнение</span>
        <WriteBox show={this.state.show}/>
      </div>
    )
  }
}

export default PostsHeader;
