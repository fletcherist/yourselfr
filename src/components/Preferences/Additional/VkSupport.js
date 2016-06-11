import React, { Component, PropTypes } from 'react';

class vkSupport extends Component {
  static propTypes = {

  };
  shouldComponentUpdate () {
    return false;
  }

  render () {
    return (
      <div className='grey'>
        страница вконтакте:
        {' '}
        <a>http://vk.com/id399929</a>
      </div>
    );
  }
}

export default vkSupport;
