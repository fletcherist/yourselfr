import React from 'react';
import s from '../GetSomething.scss';
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
              <div className={s.button}>Перейти к профилю!</div>
            </Link>
          </div>
          <ShareWithSocial/>
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
