import React, { Component, PropTypes } from 'react';
import s from './Preferences.scss';
import x from './UpdateSocialNetworks.scss';
import { connect } from 'react-redux';
import { actions } from '../../redux/modules/preferences';
import classNames from 'classnames/bind';

import { LoaderSmall } from '../Loader';

let cx = classNames.bind(s);

class Preferences extends Component {
    static propTypes = {
      username: PropTypes.string,
      alias: PropTypes.string,
      status: PropTypes.string,
      isFetching: PropTypes.object.isRequired,

      saveStatus: PropTypes.func.isRequired,
      saveAlias: PropTypes.func.isRequired,
      saveUsername: PropTypes.func.isRequired
    };

    constructor (props) {
      super(props);
      this.state = {
        username: this.props.username,
        alias: this.props.alias,
        status: this.props.status
      };
    }

    handleUsername () {
      this.props.saveUsername(this.state.username);
    }

    handleAlias () {
      this.props.saveAlias(this.state.alias)
    }

    handleStatus () {
      this.props.saveStatus(this.state.status);
    }

    componentWillReceiveProps (props) {
      this.setState({
        username: props.username,
        alias: props.alias,
        status: props.status
      });
    }

    handleChange (name, e) {
      var change = {};
      change[name] = e.target.value;
      this.setState(change);
    }
    render () {
      const {isFetching} = this.props;
      return (
            <div>
                <h3>имя</h3>
                <div className={cx(x.innerAddon)}>
                  <input
                    value={this.state.username}
                    onChange={this.handleChange.bind(this, 'username')}
                    className={cx({
                      username: true,
                      fetchingForms: isFetching.username.status,
                      formError: isFetching.username.state === false,
                      formSuccess: isFetching.username.state === true
                    })}
                    onBlur={this.handleUsername.bind(this)}
                    ref={ (r) => this.username = r }
                  />
                  <div className={x.rightAddon}>
                    {isFetching.username.status && (
                        <LoaderSmall/>
                    )}
                  </div>
                </div>
                {isFetching.username.message && (
                  <div className={cx({
                    state: true,
                    success: isFetching.username.state === true,
                    error: isFetching.username.state === false
                  })}>{isFetching.username.message}</div>
                )}

                <h3>адрес страницы</h3>
                <small>поделитесь им с друзьями, чтобы они смогли найти вас</small>
                <div className={cx(x.innerAddon)}>
                  <input
                    value={this.state.alias}
                    onChange={this.handleChange.bind(this, 'alias')}
                    className={cx({
                      alias: true,
                      fetchingForms: isFetching.alias.status,
                      formError: isFetching.alias.state === false,
                      formSuccess: isFetching.alias.state === true
                    })}
                    onBlur={this.handleAlias.bind(this)}
                    ref={ (r) => this.alias = r }
                  />
                  <div className={x.rightAddon}>
                    {isFetching.alias.status && (
                        <LoaderSmall/>
                    )}
                  </div>
                </div>
                {isFetching.alias.message && (
                  <div className={cx({
                    state: true,
                    success: isFetching.alias.state === true,
                    error: isFetching.alias.state === false
                  })}>{isFetching.alias.message}</div>
                )}
                <h3>о себе</h3>
                <div className={cx(x.innerAddon)}>
                  <textarea
                    value={this.state.status}
                    onChange={this.handleChange.bind(this, 'status')}
                    className={cx({
                      status: true,
                      fetchingForms: isFetching.status.status,
                      formError: isFetching.status.state === false,
                      formSuccess: isFetching.status.state === true
                    })}
                    onBlur={this.handleStatus.bind(this)}
                    ref={ (r) => this.status = r }
                  />
                  <div className={x.rightAddon}>
                    {isFetching.status.status && (
                        <LoaderSmall/>
                    )}
                  </div>
                </div>
                {isFetching.status.message && (
                  <div className={cx({
                    stateStatus: true,
                    success: isFetching.status.state === true,
                    error: isFetching.status.state === false
                  })}>{isFetching.status.message}</div>
                )}
            </div>
        );
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

export default connect(mapStateToProps, actions)(Preferences);
