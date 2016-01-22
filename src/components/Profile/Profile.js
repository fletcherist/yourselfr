import React from 'react';
import cx from 'classnames';
import s from './Profile.scss';
import Link from '../Link';
import withStyles from '../../decorators/withStyles';
import Counters from '../Counters';

@withStyles(s)

class Profile extends React.Component {
   static propTypes = {
     username: React.PropTypes.string.isRequired
   };

    render() {
        var online;
        if (this.props.online == true){
            online =  <img className={s.online} src='css/img/icons/online.png' width='12x'></img>
        } else {
            online = "";
        }
        return(
            <div className={s.container_user}>
                <div className={s.avatar}>
                    <Link to="abracadabra">
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
                <Counters
                    visits={this.props.visits}
                    followers={this.props.followers}
                    following={this.props.following}
                />
            </div>
        );
    }
}

export default Profile;