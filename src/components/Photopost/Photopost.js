import React, { Component, PropTypes } from 'react';
import s from './Photopost.scss';
<<<<<<< HEAD
import { config } from '../../store/config';
=======
import { config } from '../../redux/config';
>>>>>>> origin/master

class Photopost extends Component {
  static propTypes = {
    isYourPage: PropTypes.bool.isRequired,
    removePost: PropTypes.func.isRequired,
    photo: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  };

  render () {
    return (
<<<<<<< HEAD
      <div>
        <div className={s.photoPost}>
          {this.props.isYourPage && (
            <div className={s.removePhotoPost} onClick={() => this.props.removePost(this.props.id)}></div>
          )}
          <div className={s.photoText}>
            <div className={s.text} dangerouslySetInnerHTML={{__html: this.props.text}}></div>
          </div>
        </div>
        <div className={s.background} style={{background: `url(${config.http}/upload/photo/${this.props.photo})`}}></div>
=======
      <div className={s.photoPost} style={{background: `url(${config.http}/upload/photo/${this.props.photo})`}}>
          {this.props.isYourPage && (
            <div className={s.removePhotoPost} onClick={ () => this.props.removePost(this.props.id)}></div>
          )}
          <div className={s.photoText}>
            <span dangerouslySetInnerHTML={{__html: this.props.text}}></span>
          </div>
>>>>>>> origin/master
      </div>
    )
  }
}

export default Photopost;
