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
    const { authenticated, alias } = this.props;
    if (!authenticated) {
      return (null);
    }
    return (
      <div className={s.navbar}>
        <div className={s.wrap}>
          <Navigation />
          <div className={s.item}>
            <Link to={`/${alias}/friends`}>друзья</Link>
          </div>
          <div className={s.item}>
            <Link to={`/${alias}/followers`}>подписчики</Link>
          </div>
          <div className={s.item}>
            <Link to={`/${alias}/following`}>подписки</Link>
          </div>

          <div></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  alias: state.auth.user.alias,
  authenticated: state.auth.authenticated
});

// const mapDispatchToProps = dispatch => ({
//   loadUser: alias => dispatch(loadUser(alias))
// });
export default connect(mapStateToProps)(NavBar);
