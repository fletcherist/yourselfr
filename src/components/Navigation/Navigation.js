import React from 'react';
// import cx from 'classnames';
import s from './Navigation.scss';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { loadUser } from '../../redux/modules/user';

class Navigation extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        active: false
      }
    }
    toggle () {
      this.setState({
        active: !this.state.active
      })
    }
    render () {
      return (
            <div className={s.navigation}>
              {this.props.user.alias && (
                <Link to={`/${this.props.user.alias}`}>
                  <div className={s.yoButton} title='Вернуться на главную - Йорселфер' onClick={ () => this.props.loadUser(this.props.user.alias) }></div>
                </Link>
              )}
              {!this.props.user.alias && (
                <Link to='/signup'>
                  <div className={s.yoButton} title='Вернуться на главную - Йорселфер'></div>
                </Link>
              )}
            </div>
        );
    }
}

Navigation.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
  user: React.PropTypes.object,
  loadUser: React.PropTypes.func.isRequired
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
