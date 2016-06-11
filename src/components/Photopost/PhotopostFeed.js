import React, { Component, PropTypes } from 'react';
import s from './Photopost.scss';
import { config } from '../../store/config';
import { isValidPhoto } from '../Toools';
import { Link } from 'react-router';

class Photopost extends Component {
  static propTypes = {
    photo: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    attachmentsPhoto: PropTypes.string.isRequired,
    alias: PropTypes.string.isRequired
  };

  render () {
    var photo = isValidPhoto(this.props.attachmentsPhoto);
    const { alias, text } = this.props;

    return (
      <div className={s.photoPostFeed} style={{background: `url(${config.http}/upload/photo/${this.props.photo})`}}>
        <div className={s.photoAvatar}>
          <Link to={`/${alias}`}>
            <img
              src={photo}
              className={s.userPhoto} />
          </Link>
        </div>
        <div className={s.photoText}>
          <span dangerouslySetInnerHTML={{__html: text}}></span>
        </div>
      </div>
    )
  }
}

export default Photopost;
