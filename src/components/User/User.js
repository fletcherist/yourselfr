import React, { Component, PropTypes } from 'react';
import s from './User.scss';
import Profile from '../Profile';

import { connect } from 'react-redux';
import Background from '../Background';

class User extends Component {
    static propTypes = {
      children: PropTypes.element.isRequired,
      background: PropTypes.string
    };

    render () {
      return (
            <div>
                <Background background={this.props.background}/>
                <div className={s.container}>
                    <div className={s.container_left}>
                      <Profile/>
                    </div>
                    <div>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps (state) {
  return {
    background: state.user.background
  }
}

export default connect(mapStateToProps)(User);
