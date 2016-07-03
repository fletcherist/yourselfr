import React, { Component } from 'react';
import s from './Navbar.scss';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Navigation from './Navigation';
// import { loadUser } from '../../store/modules/user';

class NavBar extends Component {
  static propTypes = {

  };

  render () {
    const { authenticated, alias, username } = this.props;
    if (!authenticated) {
      return (
        <div className={s.navbar}>
          <div className={s.wrap}>
            <Navigation />
            <div className={s.right}>
              <span>нет аккаунта?</span>
              {' '}
              <Link to='/signup'>
                <b>регистрация</b>
              </Link>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className={s.navbar}>
        <div className={s.wrap}>
          <Navigation />
          <div className={s.item}>
            <Link to={`/${alias}`} activeClassName={s.active}>{username}</Link>
          </div>
          <div className={s.item}>
            <Link to={`${alias}/friends`} activeClassName={s.active}>Друзья</Link>
          </div>
          <div className={s.item}>
            <Link to='/feed' activeClassName={s.active}>Лента</Link>
          </div>
          <div className={s.item}>
            <div className={s.notification}></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  alias: state.auth.user.alias,
  authenticated: state.auth.authenticated,
  username: state.auth.user.username
});

// const mapDispatchToProps = dispatch => ({
//   loadUser: alias => dispatch(loadUser(alias))
// });
export default connect(mapStateToProps)(NavBar);
