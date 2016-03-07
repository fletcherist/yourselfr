import React from 'react';
import vk from '../SocialButtons/vk.svg';
import twitter from '../SocialButtons/twitter.svg';
import s from './ShareWithSocial.scss';
import { connect } from 'react-redux';
class ShareWithSocial extends React.Component {
  render () {
    return (
      <div>
        <div className='rate-empty-line-2'></div>
        <div>
          <a href={`http://vk.com/share.php?url=http://yourselfr.com/${this.props.alias}&amp;image=http://yourselfr.com/images/logo/yo-vk.jpg&amp;title=Узнайте обо мне больше на yourselfr!`} target='_vk'>
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
ShareWithSocial.propTypes = {
  alias: React.PropTypes.string.isRequired
}
function mapStateToProps (state) {
  return {
    alias: state.auth.user.alias
  }
}
const mapDispatchToProps = (dispatch) => {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShareWithSocial);
