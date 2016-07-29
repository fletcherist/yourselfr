import React, { Component, PropTypes } from 'react'
import s from '../GetSomething.scss'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Navbar from 'components/Navigation/Navbar'
import RaisedButton from 'material-ui/RaisedButton'

class GetStarted extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  }
  render () {
    const { username, alias } = this.props.user
    return (
      <div>
        <Navbar />
        <div className={s.container}>
          <div className={s.middle}>
            <h1 className={s.greeting}>Рады тебя видеть,<br />
              <Link to={`/${alias}`}>{username}</Link>
            </h1>
            <div className={s.info}>
              <div>Йорселфер — это бесконечный поток анонимных мнений о тебе.</div>
              <div className='rate-empty-line-5'></div>
              <span><b>Читай</b> мнения о себе и пиши, что думаешь о твоих друзьях. </span><br />
              <div className='rate-empty-line-2'></div>
              <span><b>Подписывайся</b> на людей, чтобы узнать, что о них думают другие.</span>
            </div>
            <div className='rate-empty-line-2'></div>
            <Link to='/i/get-personalized'>
              <RaisedButton fullWidth label='Дальше →' />
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

export default connect(mapStateToProps)(GetStarted)
