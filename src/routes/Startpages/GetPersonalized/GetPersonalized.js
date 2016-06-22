import React, { Component, PropTypes } from 'react';
import s from '../GetSomething.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Navigation from 'components/Navigation';
import { AvatarAndBackground } from 'components/Preferences/Photos';

class GetPersonalized extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  }
  render () {
    return (
      <div className={s.container}>
        <div className={s.middle}>
          <div className={s.navigation}>
            <Navigation />
          </div>
          <h1 className={s.greeting}>Сделайте всё красиво.</h1>
          <div className={s.info}>
            Загрузите фото профиля, чтобы ваши друзья смогли узнать вас.
          </div>
          <AvatarAndBackground />
          <div className='rate-empty-line-5'></div>
          <Link to='/i/get-socialized'>
            <div className='button button--block button--material'>Готово!</div>
          </Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GetPersonalized);
