import React, { Component, PropTypes } from 'react'
// import s from './Preferences.scss'
import { connect } from 'react-redux'
import { actions } from '../../store/modules/preferences'

import VkSupport from './Additional/VkSupport'
import RegistrationDate from './Additional/RegistrationDate'
import Email from './Additional/Email'

import { palette } from 'store/config'

import TextField from 'material-ui/TextField'

class Preferences extends Component {
  static propTypes = {
    username: PropTypes.string,
    alias: PropTypes.string,
    status: PropTypes.string,
    isFetching: PropTypes.object.isRequired,

    saveStatus: PropTypes.func.isRequired,
    saveAlias: PropTypes.func.isRequired,
    saveUsername: PropTypes.func.isRequired
  }

  render () {
    const {isFetching} = this.props
    return (
      <div>
        <h3>имя</h3>
        <div className='padding'>
          <TextField
            defaultValue={this.props.username}
            onBlur={(e) => { this.props.saveUsername(e.target.value) }}
            ref={(r) => this.username = r}
            hintText='имя пользователя'
            fullWidth
            errorStyle={
              isFetching.username.state
                ? {color: palette.yoGreen}
                : {}
            }
            errorText={isFetching.username.message}
          />
        </div>

        <h3>адрес страницы</h3>
        <small>поделитесь им с друзьями, чтобы они смогли найти вас</small>
        <div className='padding'>
          <TextField
            defaultValue={this.props.alias}
            onBlur={(e) => { this.props.saveAlias(e.target.value) }}
            ref={(r) => this.alias = r}
            hintText='адрес страницы'
            fullWidth
            errorStyle={
              isFetching.alias.state
                ? {color: palette.yoGreen}
                : {}
            }
            errorText={isFetching.alias.message}
          />
        </div>
        <h3>о себе</h3>
        <div className='padding'>
          <TextField
            defaultValue={this.props.status}
            onBlur={(e) => { this.props.saveStatus(e.target.value) }}
            ref={(r) => this.status = r}
            errorStyle={
              isFetching.status.state
                ? {color: palette.yoGreen}
                : {}
            }
            errorText={isFetching.status.message}
            multiLine
            fullWidth
            rows={3}
          />
        </div>
        <div>
          <div className='rate-empty-line-2'></div>
          <VkSupport />
          <RegistrationDate />
          <Email />
        </div>
      </div>
      )
  }
}

function mapStateToProps (state) {
  return {
    username: state.auth.user.username,
    alias: state.auth.user.alias,
    status: state.auth.user.status,
    isFetching: state.isFetching
  }
}

export default connect(mapStateToProps, actions)(Preferences)
