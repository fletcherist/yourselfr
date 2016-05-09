import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import s from './Buttons.scss';
import Translate from 'react-translate-component';

export class ButtonContainer extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };
  render () {
    return (
      <div className={s.container}>{this.props.children}</div>
    )
  }
}
export class AuthenticateButton extends Component {
  render () {
    return (
      <div>
        <Link to='/login'>
          <div className={s.AuthenticateButton}>
            <Translate content='login.button'/>
          </div>
        </Link>
      </div>
    )
  }
}
