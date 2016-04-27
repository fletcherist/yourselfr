import React, { Component, PropTypes } from 'react';
import s from './Posts.scss';

class NoPosts extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  };

  doSomething () {

  }
  render () {
    return (
      <div>
        {this.props.isAuthenticated && (
          <div className={s.noPostsContainer}>
            <div className={s.noPosts}>Можем поспорить, что через 5 минут здесь будут анонимные мнения о вас.</div>
          </div>
        )}
        {!this.props.isAuthenticated && (
          <div className={s.noPostsEmpty}>
            <div className={s.NoPosts}>Пока ничего нет. Напишите первым!</div>
          </div>
        )}
      </div>
    );
  }
}

export default NoPosts;
