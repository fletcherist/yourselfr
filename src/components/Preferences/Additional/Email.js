import React, { Component } from 'react';

class Email extends Component {
  static propTypes = {

  };

  shouldComponentUpdate () {
    return false;
  }

  render () {
    return (
      <div className='text-grey'>
        адрес электронной почты:
        {' '}
        <b>romanovexports@gmail.com</b>
      </div>
    );
  }
}

export default Email;
