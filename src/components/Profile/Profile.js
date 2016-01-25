import React from 'react';
import s from './Profile.scss';
import { Link } from 'react-router';
import Counters from '../Counters';
import {connect} from 'react-redux';

import {actions as userActions} from '../../redux/modules/user';

class Profile extends React.Component {
   componentWillMount () {
     this.props.loadUser();
   }
    render () {
      var online;
      if (this.props.online === true) {
        online = <img className={s.online} src='css/img/icons/online.png' width='12x'></img>
      } else {
        online = '';
      }
      return (
        <div className={s.container_user}>
                <div className={s.avatar}>
                    <Link to='abracadabra'>
                        <img src={require('./avatar.png')}/>
                    </Link>
                </div>
                <h1 className={s.username}>
                    <span>
                        {this.props.username}
                    </span>
                    {online}
                </h1>
                <div className={s.status}>
                    {this.props.status}
                </div>
                <Counters/>
            </div>
      )
    }
}

// <Counters
//     visits={this.props.visits}
//     followers={this.props.followers}
//     following={this.props.following}
// />
Profile.propTypes = {
  username: React.PropTypes.string.isRequired,
  photo: React.PropTypes.string.isRequired,
  online: React.PropTypes.object,
  status: React.PropTypes.string,
  stats: React.PropTypes.shape({
    visits: React.PropTypes.number.isRequired,
    followers: React.PropTypes.number.isRequired,
    following: React.PropTypes.number.isRequired
  }),
  loadUser: React.PropTypes.func.isRequired
};

function mapStateToProps (state) {
  return {
    username: state.user.username,
    photo: state.user.photo,
    online: state.user.online,
    status: state.user.status,
    stats: state.user.stats
  }
}

export default connect(mapStateToProps, userActions)(Profile);
