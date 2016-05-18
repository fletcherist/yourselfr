import React, { Component, PropTypes } from 'react';
import { config } from '../../redux/config';

class Background extends Component {
  static propTypes = {
    background: PropTypes.string
  };

  shouldComponentUpdate (nextProps) {
    return nextProps.background !== this.props.background;
  }

  render () {
    var backround = this.props.background
      ? {
        background: `url(${config.http}/upload/background/${this.props.background})`
      }
      : {}
    return (
      <div className='responsive_crop_fixed' style={backround}></div>
    )
  }
}

export default Background;
