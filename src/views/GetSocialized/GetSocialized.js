import React from 'react';
import cx from 'classnames';
import s from './GetSocialized.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Navigation from 'components/Navigation';
import ShareWithSocial from 'components/ShareWithSocial';

class GetSocialized extends React.Component {
  render () {
    // const { username } = this.props.user;
    return (
      <div>
        <Navigation/>
        <div className={s.container}>
          <div className={s.left}>
            <h1 className={s.greeting}>Последнее.<br/> Расскажите в соцсетях.</h1>
            <div className={s.info}>
              Поделитесь ссылкой на страничку в ВК или в Твиттере, чтобы ваши друзья смогли найти Вас.
            </div>
            <Link to={`/${this.props.user.alias}`}>
              <button className={cx('button', s.button)}>Перейти к профилю!</button>
            </Link>
          </div>
          <div className=''>
            <ShareWithSocial/>
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
