import React from 'react';
import { Link } from 'react-router';
import s from './WantToRegister.scss';
import Translate from 'react-translate-component';

class WantToRegister extends React.Component {
  constructor () {
    super();
    this.state = {
      step: 1
    }
  }
  render () {
    return (
      <div>
        <Link to='/signup'>
          <div className={s.WantToRegister}>
            <Translate content='same.WantToRegister'/>
          </div>
        </Link>
      </div>
    )
  }
}

export default WantToRegister;
