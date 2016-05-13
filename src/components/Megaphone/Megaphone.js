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
        <div className={x.input}>yourselfr.com/{PropTypes.alias}</div>
        <div className={x.buttons}>
// http://www.facebook.com/sharer.php                 ?u ?t
// http://vk.com/share.php                            ?url ?title ?description
// http://twitter.com/share                           ?url ?text ?via
// https://www.tumblr.com/widgets/share/tool          ?canonicalUrl=

          <div className={cx(x.button, x.vk)}><span>ВК</span></div>
          <div className={cx(x.button, x.fb)}><span>Фейсбук</span></div>
          <div className={cx(x.button, x.tw)}><span>Твитер</span></div>
          <div className={cx(x.button, x.tb)}><span>Тамблер</span></div>
        </div>
      </div>
    );
  }
}

export default Megaphone
