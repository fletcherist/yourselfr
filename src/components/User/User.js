import React from 'react';
import s from './User.scss';
import Profile from '../Profile';
import Navigation from '../Navigation';
import WriteBox from '../WriteBox';

import { connect } from 'react-redux';
import { config } from '../../redux/config';

class User extends React.Component {
    render () {
      var backround = this.props.background
        ? {
          background: `url(${config.http}/upload/background/${this.props.background})`,
          transition: 'all 0.5s'
        }
        : {}
      return (
<div>
<div className="user emerge" data-spin="true" data-spin-size="32" data-spin-color="#000" data-effect="relax" data-continue="true">
    <div className="box user__box box--narrow">
      <img className="user__picture" src="https://pp.vk.me/c627521/v627521538/2d215/Gz2GvxjXh0w.jpg" width="200" height="200"/>
      <div className="user__info">
        <div className="user__name">Глеб Лебедев</div>
        <div className="user__stats stats">
          <div className="stats__item">
            <div className="stats__count">3 430</div>
            <div className="stats__title">мнений</div>
          </div>
          <div className="stats__item">
            <div className="stats__count">120</div>
            <div className="stats__title">следят</div>
          </div>
          <div className="stats__item">
            <div className="stats__count">13</div>
            <div className="stats__title">читает</div>
          </div>
        </div>
      </div>
    </div>
    <div className="button button--subscribe">Подписаться</div><br/>
  </div>
  <div className="feed">
    <div className="box feed__box box--input emerge" data-spin="true" data-spin-size="32" data-spin-color="#000" data-effect="relax" data-continue="true">
      <textarea className="feed__input" placeholder="А что вы думаете об этом человеке?"></textarea>
      <div className="feed__button button button--submit">Высказаться</div>
  <div className="feed__button button button--photo"><img className="button__icon" width="21px" height="17px" src="assets/img/attach.png"/></div>
    </div>
    <div className="box feed__box feed__box--posts emerge" data-spin="true" data-spin-size="32" data-spin-color="#000" data-effect="relax" data-continue="true">
      <div className="feed__post post">
        <div className="post__date">10 мин</div>
        <div className="post__text">Глеб ты соска жаль ходишь с телефоном с выходом в интернет это плохо</div>
        <div className="post__likes">
          <span className="likes__count">14</span>
          <img className="likes__image" src="/assets/img/like.png"/>
        </div>
      </div>
      <div className="feed__post post">
        <div className="post__date">10 мин</div>
        <div className="post__text">У тебя саркаидоз</div>
        <div className="post__likes">
          <span className="likes__count">9&ensp;000</span>
          <img className="likes__image" src="/assets/img/like.png"/>
        </div>
      </div>
      <div className="feed__post post post--image">
        <div className="post__date">10 мая</div>
        <div className="post__text">
          <img className="post__image" src="/assets/img/photo.jpg"/>
          <p>привет из сургута ☀️🌩🔥</p>
        </div>
        <div className="post__likes">
          <span className="likes__count">2&ensp;120</span>
          <img className="likes__image" src="/assets/img/like.png"/>
        </div>
      </div>
      <div className="feed__post post">
        <div className="post__date">10 мин</div>
        <div className="post__text">да разорвёт нас флоатом и дивом святым да троица ст. м. Семёновская</div>
        <div className="post__likes">
          <span className="likes__count">14</span>
          <img className="likes__image" src="/assets/img/like.png"/>
        </div>
      </div>
      <div className="feed__post post">
        <div className="post__date">10 мин</div>
        <div className="post__text">АХЗАЗАЗА ЕБАТЬ ВОТ ТЫ КРУТОЙ ПОЦАН я тебе блять отвечаю ты нереально суперский хочу от тебя 189304 детей и неразрывный пробел</div>
        <div className="post__likes">
          <span className="likes__count">14</span>
          <img className="likes__image" src="/assets/img/like.png"/>
        </div>
      </div>
      <div className="feed__post post">
        <div className="post__date">10 мин</div>
        <div className="post__text">Самый модный тренд гоша</div>
        <div className="post__likes">
          <span className="likes__count">14</span>
          <img className="likes__image" src="/assets/img/like.png"/>
        </div>
      </div>
    </div>
  </div>

</div>
        );
    }
}

// <div classNameNameName='user'>
//     <div classNameName={s.container}>
//         <div classNameName={s.container_left} id='left'>
//             <div classNameName={s.container_user}>
//                 <Profile/>
//             </div>
//         </div>
//         <div>
//             {this.props.children}
//         </div>
//     </div>
// </div>

User.propTypes = {
  children: React.PropTypes.element.isRequired
}

function mapStateToProps (state) {
  return {
    background: state.user.background
  }
}

export default connect(mapStateToProps)(User);
