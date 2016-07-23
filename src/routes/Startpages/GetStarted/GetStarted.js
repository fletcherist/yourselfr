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
    const { username } = this.props.user
    return (
      <div>
        <Navbar />
        <div className={s.container}>
          <div className={s.middle}>
            <h1 className={s.greeting}>Рады вас видеть, {username}.</h1>
            <div className={s.info}>
              <div>Йорселфер — это бесконечный поток мнений о вас.</div>
              <span><b>Читайте</b> мнения о себе и <b>анонимно пишите</b>, что думаете о ваших друзьях. </span>
              <span><b>Подпишитесь</b> на тех людей, мнения о которых вы хотите знать.</span>
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
