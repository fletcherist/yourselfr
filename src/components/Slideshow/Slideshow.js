import lay1 from './Layouts2/Layout1.jpg';
import lay2 from './Layouts2/Layout2.jpg';
import lay3 from './Layouts2/Layout3.jpg';
import lay4 from './Layouts2/Layout4.jpg';

import React from 'react';

var backgrounds = [lay1, lay2, lay3, lay4];

class Slideshow extends React.Component {
  constructor () {
    super();
    var randPicture = Math.floor(Math.random() * 4);
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
        <div className='responsive_crop_fixed slideshow' style={this.state.style} id='background' ref={(r) => this.background = r}></div>
      </div>

    )
  }
}

export default Slideshow;
