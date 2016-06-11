import React, { Component, PropTypes } from 'react';

class RegistrationDate extends Component {
  static propTypes = {

  };

  render () {
    return (
      <div className='text-grey'>
        вы зарегистрировались:
        {' '}
        <b>22.04.2015</b>
      </div>
    );
  }
}

export default RegistrationDate;
