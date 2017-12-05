import React, { Component, PropTypes } from 'react'
import classNames from 'classnames/bind'
import s from './Navigation.scss'
import { Link } from 'react-router'
import { isValidPhoto } from 'components/Toools'
import { loadUser } from '../../store/modules/user'

let cx = classNames.bind(s)

const active = {
  backgroundColor: 'rgb(246, 246, 246)'
}
class Navigation extends Component {
  constructor (props) {
    super(props)

    const hideMenu = !this.props.active || false
    this.state = {
      hideMenu: hideMenu,
      hideLogo: true
    }
  }
  toggle () {
    this.setState({hideMenu: !this.state.hideMenu})
  }
  render () {
    const { authenticated, hideLogo, center } = this.props
    let marginCenter = {
      margin: 0
    }
    console.log(authenticated)
    marginCenter.margin = center ? '10px auto' : ''
    return (
      <div className={s.navigation} style={marginCenter}>
        {this.props.authenticated && (
          <div>
            <div className={s.yoButton}
              style={{display: hideLogo ? 'none' : 'block'}}
              title='Вернуться на главную - Йорселфер' onClick={this.toggle.bind(this)} />
            <div title='Main Menu' className={cx({
              menu: true,
              hiddenMenu: this.state.hideMenu
            })} style={{
              marginLeft: center ? '-120px' : ''
            }}>
              <div className={s.element} onClick={this.toggle.bind(this)}>
                <Link to={`/${this.props.user.alias}`}>
                  <div title='перейти к профилю' className={s.photo} onClick={() => this.props.loadUser(this.props.user.alias)}>
                    <img src={isValidPhoto(this.props.user.photo)} />
                  </div>
                  <div>профиль</div>
                </Link>
              </div>
              <div className={s.element} onClick={this.toggle.bind(this)}>
                <Link to='/feed' activeStyle={active}>
                  <div title='мнения о друзьях' className={cx(s.icon, s.iconFeed)} />
                  <div>лента</div>
                </Link>
              </div>
              <div className={s.element} onClick={this.toggle.bind(this)}>
                <Link to='/preferences' activeStyle={active}>
                  <div title='настройки профиля' className={cx(s.icon, s.iconPreferences)} />
                  <div>настройки</div>
                </Link>
              </div>
              <div className={s.element} onClick={this.toggle.bind(this)}>
                <Link to={`/${this.props.user.alias}/followers`} activeStyle={active}>
                  <div title='люди, подписанные на вас' className={cx(s.icon, s.iconFollowers)} />
                  <div>подписчики</div>
                </Link>
              </div>
              <div className={s.element} onClick={this.toggle.bind(this)}>
                <Link to={`/${this.props.user.alias}/following`} activeStyle={active}>
                  <div title='люди, на которых подписаны вы' className={cx(s.icon, s.iconFollowing)} />
                  <div>подписки</div>
                </Link>
              </div>
              <div className={s.element} onClick={this.toggle.bind(this)}>
                <a href='http://yoursel.fr/auth/logout'>
                  <div title='выйти' className={cx(s.icon, s.iconLogout)} />
                  <div>выход</div>
                </a>
              </div>
            </div>
          </div>
        )}
        {!this.props.authenticated && (
          <Link to='/signup'>
            <div className={s.yoButton} title='Вернуться на главную - Йорселфер' onClick={this.toggle.bind(this)}></div>
          </Link>
        )}
      </div>
      )
  }
}

Navigation.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  user: PropTypes.object,
  loadUser: PropTypes.func.isRequired,
  active: PropTypes.bool
}

export default Navigation
