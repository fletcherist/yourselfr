import React, { Component, PropTypes } from 'react';
import vk from 'components/Buttons/SocialButtons/vk.svg';
import twitter from 'components/Buttons/SocialButtons/twitter.svg';
import s from './ShareWithSocial.scss';
import { connect } from 'react-redux';
import { selectText } from '../Toools';

class ShareWithSocial extends Component {
  static propTypes = {
    alias: PropTypes.string.isRequired
  };
  doS () {

  }
  render () {
    return (
      <div>
        <div className='rate-empty-line-2'></div>
        <div>
          <div>
            <div className={s.linkTitle}>Разместите ссылку на ваш профиль (@{this.props.alias})</div>
            <div id='selectable' className={s.link} ref={(r) => this.link = r}
                onClick={ () => selectText('selectable') }>http://yourselfr.com/<b>{this.props.alias}</b></div>
          </div>
          <div className='groupSeparator grey'><p>или</p></div>
          <a href={`http://vk.com/share.php?url=http://yourselfr.com/${this.props.alias}&image=http://yourselfr.com/images/logo/yo-vk.jpg&title=Узнайте обо мне больше на Йорселфере!`} target='_vk'>
            <img src={vk} alt='Рассказать Вконтакте' className={s.network}/>
          </a>
          <div className={s.description}>Нажмите на кнопку, чтобы разместить запись Вконтакте со ссылкой на вашу страницу.</div>
        </div>
        <div>
          <a href={`http://twitter.com/home?status=Узнайте обо мне больше на http://yourselfr.com/${this.props.alias}`} target='_blank'><img src={twitter} alt='Рассказать в Твиттере' className={s.network}/></a>
          <div className={s.description}>Нажмите, чтобы твитнуть ссылку на ваш профиль на Йорселфере.</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    alias: state.auth.user.alias
  }
}

export default connect(mapStateToProps)(ShareWithSocial);
