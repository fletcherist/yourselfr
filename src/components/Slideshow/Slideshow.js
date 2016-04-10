import lay1 from './Layout1.jpg';
import React from 'react';

var backgrounds = [lay1];

class Slideshow extends React.Component {
  constructor () {
    super();
    var randPicture = Math.floor(Math.random());
    this.state = {
      style: {
        background: `url(${backgrounds[randPicture]})`
      }
    }
  }

  componentWillUnmount () {
    return false;
  }
  render () {
    return (
      <div>
        <div className='black_layout'></div>
        <div className='responsive_crop_fixed' style={this.state.style} id='background' ref={(r) => this.background = r}></div>
      </div>

    )
  }
}

export default Slideshow;
