import React from 'react';
import s from '../GetSomething.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Navigation from 'components/Navigation';
import UploadAvatar from 'components/Preferences/UploadAvatar';
import UploadBackground from 'components/Preferences/uploadBackground';

class GetPersonalized extends React.Component {
  render () {
    return (
      <div>
        <Navigation/>
        <div className={s.container}>
          <div className={s.left}>
            <h1 className={s.greeting}>Сделайте всё красиво.</h1>
            <div className={s.info}>
              Загрузите фото профиля, чтобы ваши друзья смогли узнать вас.
            </div>
            <div>
              Профиль должен быть красивым, как цветок дао, и глубоким, как река.
            </div>
            <div className='rate-empty-line-3'></div>
            <Link to='/i/get-socialized'>
              <div className={s.button}>Продолжить</div>
            </Link>
          </div>
          <div className={s.right}>
            <UploadAvatar/>
            <UploadBackground/>
          </div>
        </div>
      </div>
    )
  }
}

GetPersonalized.propTypes = {
  user: React.PropTypes.object.isRequired
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
