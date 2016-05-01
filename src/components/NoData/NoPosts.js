import React, { Component, PropTypes } from 'react';
import s from './NoData.scss';

class NoPosts extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  };

  doSomething () {

  }
  render () {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return (
        <div className={s.noPosts}>Здесь будет показываться то,<br/> что ваши друзья думают о Вас.</div>
      )
    } else {
      return (
        <div className={s.noPosts}>Пока ничего нет. Напишите первым!</div>
      )
    }
  }
}

export default NoPosts;
