import React from 'react';
import s from '../GetSomething.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Navigation from 'components/Navigation';
import ShareWithSocial from 'components/ShareWithSocial';

class GetSocialized extends React.Component {
  render () {
    return (
      <div>
        <div className={s.container}>
          <div className={s.middle}>
            <div className={s.navigation}>
              <Navigation />
            </div>
            <h1 className={s.greeting}>Последнее.<br /> Расскажите в соцсетях.</h1>
            <ShareWithSocial />
            <div className='rate-empty-line-2'></div>
            <Link to={`/${this.props.user.alias}`}>
              <div className='button button--block button--material'>Перейти к профилю!</div>
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
