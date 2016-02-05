import React from 'react';
import {connect} from 'react-redux';
import {routeActions} from 'react-router-redux';

export function requireAuthentication (Component) {
  class AuthenticatedComponent extends React.Component {

        componentWillMount () {
          this.checkAuth();
        }

        componentWillReceiveProps (nextProps) {
          this.checkAuth();
        }

        checkAuth () {
          if (!this.props.isAuthenticated) {
            // let redirectAfterLogin = this.props.location.pathname;
            this.props.dispatch(routeActions.push('/login'));
          }
        }

        render () {
          return (
                <div>
                    {this.props.isAuthenticated === true
                        ? <Component {...this.props}/>
                        : null
                    }
                </div>
            )
        }
    }

  const mapStateToProps = (state) => ({
    // token: state.auth.token,
    // userName: state.auth.userName,
    // isAuthenticated: state.auth.isAuthenticated
  });

  AuthenticatedComponent.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired,
    dispatch: React.PropTypes.func.isRequired
  }
  AuthenticatedComponent.defaultProps = {
    isAuthenticated: false
  }

  return connect(mapStateToProps)(AuthenticatedComponent);
}
