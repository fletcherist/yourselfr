import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import x from './megaphone.scss';
// i am like this when the police finally finds me
// dropped body on a slippy road
// this shitty component is the last thing i will gift to this pathetic
// and useless and stupid funny society
class Megaphone extends Component {
  static propTypes = {
    alias: PropTypes.string.isRequired
  };
  render () {
    return (
      <div className={cx(x.megaphone, 'container--left')}>
        <div className={x.text}>
          Поделитесь ссылкой с друзьями, чтобы получить шквал  мнений о&nbsp;себе:
        </div>
        <div className={x.input}>yourselfr.com/{this.props.alias}</div>
        <div className={x.buttons}>
          <a href='http://www.facebook.com/sharer.php?u=?t='
            className={cx(x.button, x.vk)}>ВК</a>
          <a href='http://vk.com/share.php?url=?title=?description'
            className={cx(x.button, x.fb)}>Фейсбук</a>
          <a href='http://twitter.com/share?url=?text=?via='
            className={cx(x.button, x.tw)}>Твитер</a>
          <a href='https://www.tumblr.com/widgets/share/tool?canonicalUrl='
            className={cx(x.button, x.tb)}>Тамблер</a>
        </div>
      </div>
    );
  }
}

export default Megaphone
