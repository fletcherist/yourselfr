import React from 'react'
import s from '../GetSomething.scss'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Navbar from 'components/Navigation/Navbar'
import ShareWithSocial from 'components/ShareWithSocial'
import RaisedButton from 'material-ui/RaisedButton'

class GetSocialized extends React.Component {
  render () {
    return (
      <div>
        <Navbar />
        <div>
          <div className={s.container}>
            <div className={s.middle}>
              <h1 className={s.greeting}>Делись с друзьями.</h1>
              <ShareWithSocial />
              <div className='rate-empty-line-2'></div>
              <Link to={`/${this.props.user.alias}`}>
                <RaisedButton label='перейти к профилю →' />
              </Link>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(GetSocialized)
