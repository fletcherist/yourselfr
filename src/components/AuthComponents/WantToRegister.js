import React from 'react';
import { Link } from 'react-router';
import s from './WantToRegister.scss';

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
          <div className={s.WantToRegister}>Тоже хочу узнать мнения о себе!</div>
        </Link>
      </div>
    )
  }
}

export default WantToRegister;
