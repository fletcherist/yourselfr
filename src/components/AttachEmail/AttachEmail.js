import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import s from './AttachEmail.scss';

class AttachEmail extends Component {
  static propTypes = {
    email: PropTypes.string
  };
  componentWillUpdate () {
    return false;
  }
  render () {
    return (
      <div className='container--left'>
        <div className={s.text}>Получайте уведомления о мнениях на почту</div>
        <div className={s.inputHolder}>
          <input className={s.input} placeHolder='youremail@gmail.com' />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.auth.user.email
  }
}
export default connect(mapStateToProps)(AttachEmail);
