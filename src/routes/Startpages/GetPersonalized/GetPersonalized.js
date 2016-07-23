import React, { Component, PropTypes } from 'react'
import s from '../GetSomething.scss'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Navbar from 'components/Navigation/Navbar'
import RaisedButton from 'material-ui/RaisedButton'

import { AvatarAndBackground } from 'components/Preferences/Photos'

class GetPersonalized extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  }
  render () {
    return (
      <div>
        <Navbar />
        <div className={s.container}>
          <div className={s.middle}>
            <h1 className={s.greeting}>Сделай красиво.</h1>
            <div className={s.info}>
              Загрузите фото профиля, чтобы ваши друзья смогли узнать вас.
            </div>
            <AvatarAndBackground />
            <div className='rate-empty-line-5'></div>
            <Link to='/i/get-socialized'>
              <RaisedButton fullWidth label='Готово!' />
            </Link>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(GetPersonalized)
