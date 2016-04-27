import React from 'react';
import s from './User.scss';
import Profile from '../Profile';

import { connect } from 'react-redux';
import Navigation from '../Navigation';
import Background from '../Background';

class User extends React.Component {
    render () {
      return (
            <div>
                <Background background={this.props.background}/>
                <Navigation/>
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

User.propTypes = {
  children: React.PropTypes.element.isRequired,
  background: React.PropTypes.string
}

function mapStateToProps (state) {
  return {
    background: state.user.background
  }
}

export default connect(mapStateToProps)(User);
