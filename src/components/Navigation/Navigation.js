import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import s from './Navigation.scss';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { loadUser } from '../../redux/modules/user';

let cx = classNames.bind(s);

const active = {
  backgroundColor: 'rgb(246, 246, 246)'
}
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
                        <div>профиль</div>
                      </Link>
                    </div>
                    <div className={s.element} onClick={ this.toggle.bind(this) }>
                      <Link to='/feed' activeStyle={active}>
                        <div title='перейти к ленте' className={cx(s.icon, s.iconFeed)}/>
                        <div>лента</div>
                      </Link>
                    </div>
                    <div className={s.element} onClick={ this.toggle.bind(this) }>
                      <Link to='/preferences' activeStyle={active}>
                        <div title='перейти к настройкам' className={cx(s.icon, s.iconPreferences)}/>
                        <div>настройки</div>
                      </Link>
                    </div>
                    <div className={s.element} onClick={ this.toggle.bind(this) }>
                      <Link to={`/${this.props.user.alias}/followers`} activeStyle={active}>
                        <div title='перейти к подписчикам' className={cx(s.icon, s.iconFollowers)}/>
                        <div>подписчики</div>
                      </Link>
                    </div>
                    <div className={s.element} onClick={ this.toggle.bind(this) }>
                      <Link to={`/${this.props.user.alias}/following`} activeStyle={active}>
                        <div title='перейти к подпискам' className={cx(s.icon, s.iconFollowing)}/>
                        <div>подписки</div>
                      </Link>
                    </div>
                    <div className={s.element} onClick={ this.toggle.bind(this) }>
                      <a href='../auth/logout'>
                        <div title='вечно возвратиться' className={cx(s.icon, s.iconLogout)}/>
                        <div>выход</div>
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
