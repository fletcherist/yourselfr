import React from 'react';
import s from './Post.scss';
import { isValidPhoto } from '../Toools';
import { Link } from 'react-router';

export class UserAvatar extends React.Component {
  render () {
    var photo = isValidPhoto(this.props.photo);
    var styles = {
      link: {
        border: '0px'
      }
    }
    return (
      <div className={s.time} style={{marginRight: '15px'}}>
        <Link to={`/${this.props.alias}`} style={styles.link}>
          <img
            src={photo}
            className={s.photo}/>
        </Link>
      </div>
    );
  }
}
UserAvatar.propTypes = {
  photo: React.PropTypes.string.isRequired,
  alias: React.PropTypes.string.isRequired
}
