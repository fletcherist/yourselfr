import React from 'react';
import cx from 'classnames';
import s from './GetSocialized.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Navigation from 'components/Navigation';

class GetSocialized extends React.Component {
  render () {
    const { username } = this.props.user;
    return (
      <div>
        <Navigation/>
        <div className={s.container}>
          <div className={s.left}>
            <h1 className={s.greeting}>Рады вас видеть, {username}.</h1>
            <div className={s.info}>
              Get Sozialized
            </div>
            <div>
              Расскажите друзьям о том, что вы есть на Йорселфере, и мы поможем сделать <br/> ваш профиль популярнее.
            </div>
            <Link to='/i/get-socialized'>
              <button className={cx('button', s.button)}>Продолжить!</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

GetSocialized.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(GetSocialized);
