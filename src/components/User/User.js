import React from 'react';
import s from './User.scss';
import Profile from '../Profile';
import Navigation from '../Navigation';

import { connect } from 'react-redux';
import { config } from '../../redux/config';

class User extends React.Component {
    render () {
      var backround = this.props.background
        ? {
          background: `url(${config.http}/upload/background/${this.props.background})`,
          transition: 'all 0.5s'
        }
        : {}
      return (
            <div>
                <div
                    className='responsive_crop_fixed'
                    style={backround}>
                </div>
                <div className={s.container}>
                    <div className={s.container_left} id='left'>
                        <div className={s.container_user}>
                            <Profile/>
                        </div>
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
  children: React.PropTypes.element.isRequired
}

function mapStateToProps (state) {
  return {
    background: state.user.background
  }
}

export default connect(mapStateToProps)(User);
