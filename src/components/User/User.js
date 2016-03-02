import React from 'react';
import s from './User.scss';
import Profile from '../Profile';

import { connect } from 'react-redux';
import { config } from '../../redux/config';
import Navigation from '../Navigation';

class User extends React.Component {
    render () {
      var backround = this.props.background
        ? {
          background: `url(${config.http}/upload/background/${this.props.background})`
        }
        : {}
      return (
            <div>
                <div
                    className='responsive_crop_fixed'
                    style={backround}>
                </div>
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
