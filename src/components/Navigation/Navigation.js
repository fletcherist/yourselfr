import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import s from './Navigation.scss';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { loadUser } from '../../redux/modules/user';

let cx = classNames.bind(s);

class Navigation extends Component {
    static propTypes = {
      isAuthenticated: PropTypes.bool.isRequired,
      user: PropTypes.object,
      loadUser: PropTypes.func.isRequired
    };
    constructor (props) {
      super(props);
      this.state = {
        hideMenu: true
      }
    }
    toggle () {
      this.setState({
        hideMenu: !this.state.hideMenu
      })
    }
    render () {
      return (
            <div className={s.navigation}>
              {this.props.isAuthenticated && (
                <div>
                  <div className={s.yoButton} title='Вернуться на главную - Йорселфер' onClick={ this.toggle.bind(this) }></div>
                  <div title='Main Menu' className={cx({
                    menu: true,
                    hiddenMenu: this.state.hideMenu
                  })}>
                    <div className={s.element} onClick={ this.toggle.bind(this) }>
                      <Link to={`/${this.props.user.alias}`}>
                        <div title='перейти к профилю' className={s.photo} onClick={ () => this.props.loadUser(this.props.user.alias)}>
                          <img src={this.props.user.photo}/>
                        </div>
                        профиль
                      </Link>
                    </div>
                    <div className={s.element} onClick={ this.toggle.bind(this) }>
                      <Link to='/feed'>
                        <div title='перейти к ленте' className={cx(s.icon, s.iconFeed)}/>
                        лента
                      </Link>
                    </div>
                    <div className={s.element} onClick={ this.toggle.bind(this) }>
                      <Link to='/preferences'>
                        <div title='перейти к настройкам' className={cx(s.icon, s.iconPreferences)}/>
                        настройки
                      </Link>
                    </div>
                    <div className={s.element} onClick={ this.toggle.bind(this) }>
                      <Link to={`/${this.props.user.alias}/followers`}>
                        <div title='перейти к подписчикам' className={cx(s.icon, s.iconFollowers)}/>
                        подписчики
                      </Link>
                    </div>
                    <div className={s.element} onClick={ this.toggle.bind(this) }>
                      <Link to={`/${this.props.user.alias}/following`}>
                        <div title='перейти к подпискам' className={cx(s.icon, s.iconFollowing)}/>
                        подписки
                      </Link>
                    </div>
                    <div className={s.element} onClick={ this.toggle.bind(this) }>
                      <a href='../auth/logout'>
                        <div title='вечно возвратиться' className={cx(s.icon, s.iconLogout)}/>
                        выход
                      </a>
                    </div>
                  </div>
                </div>
              )}
              {!this.props.isAuthenticated && (
                <Link to='/signup'>
                  <div className={s.yoButton} title='Вернуться на главную - Йорселфер' onClick={ this.toggle.bind(this) }></div>
                </Link>
              )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.authenticated,
    user: state.auth.user
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadUser: (alias) => dispatch(loadUser(alias))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
