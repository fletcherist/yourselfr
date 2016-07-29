import React, { Component } from 'react'
import WriteBox from './WriteBox'

class OpenBox extends Component {
  static propTypes = {

  };

  render () {
    return (
      <div>
        <WriteBox isOpen />
      </div>
    )
  }
}

export default OpenBox
