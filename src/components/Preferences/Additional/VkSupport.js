import React, { Component, PropTypes } from 'react';

class vkSupport extends Component {
  static propTypes = {

  };
  shouldComponentUpdate () {
    return false;
  }

  render () {
    return (
      <div className='text-grey'>
        страница вконтакте:
        {' '}
        <a><b>http://vk.com/id399929</b></a>
      </div>
    );
  }
}

export default vkSupport;
