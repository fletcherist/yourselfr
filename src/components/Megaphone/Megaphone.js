import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import x from './megaphone.scss';
import { selectText } from '../Toools';
// i am like this when the police finally finds me
// dropped body on a slippy road
// this shitty component is the last thing i will gift to this pathetic
// and useless and stupid funny society
class Megaphone extends Component {
  static propTypes = {
    alias: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  };
  PIZDA () {};
  render () {
    return (
      <div className={cx(x.megaphone, 'container--left')}>
        <div className={x.text}>
          Поделитесь ссылкой с&nbsp;друзьями, чтобы получить шквал  мнений&nbsp;о&nbsp;себе
        </div>
        <div className={x.input} id='megaphone' onClick={ () => selectText('megaphone') }>yourselfr.com/<b>{this.props.alias}</b></div>
        <div className={x.buttons}>
          <a href={`http://vk.com/share.php?url=http://yourselfr.com/${this.props.alias}&title=Узнайте обо мне больше на Йорселфере!`}
            className={cx(x.button, x.vk)}>ВК</a>
          <a href='http://www.facebook.com/sharer.php?u=http://yourselfr.com/?t='
            className={cx(x.button, x.fb)}>Фейсбук</a>
          <a href='http://twitter.com/share?url=http://yourselfr.com/?text=?via='
            className={cx(x.button, x.tw)}>Твитер</a>
          <a href='https://www.tumblr.com/widgets/share/tool?canonicalUrl=http://yourselfr.com/'
            className={cx(x.button, x.tb)}>Тамблер</a>
        </div>
      </div>
    );
  }
}

export default Megaphone
