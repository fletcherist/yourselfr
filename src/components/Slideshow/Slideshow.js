import lay1 from './Layout1.jpg';
import lay2 from './Layout2.jpg';
import lay3 from './Layout3.jpg';
import lay4 from './Layout4.jpg';
import React from 'react';

var backgrounds = [lay4, lay3, lay1, lay2];

class Slideshow extends React.Component {
  constructor () {
    super();
    this.state = {
      style: {
        background: `url(${backgrounds[0]})`
      },
      backgroundCount: 1,
      count: 0
    }
  }
  fadeOut (element) {
    var opacity = 1;

    var self = this;
    function decrease () {
      opacity -= 0.03;
      if (opacity <= 0) {
        element.style.opacity = 0;

        var backgroundCount;
        if (self.state.backgroundCount === backgrounds.length - 1) {
          backgroundCount = 0;
        } else {
          backgroundCount = self.state.backgroundCount + 1;
        }

        self.setState({
          style: {
            background: `url(${backgrounds[self.state.backgroundCount]})`
          },
          backgroundCount: backgroundCount,
          count: self.state.count + 1
        })
        self.fadeIn(element);
        return true;
      }
      element.style.opacity = opacity;
      requestAnimationFrame(decrease);
    }
    decrease();
  }

  fadeIn (element) {
    var opacity = 0;

    var self = this;
    function decrease () {
      opacity += 0.03;
      if (opacity >= 1) {
        element.style.opacity = 1;

        setTimeout(() => {
          self.fadeOut(element);
        }, 5000);
        return true;
      }
      element.style.opacity = opacity;
      requestAnimationFrame(decrease);
    }
    decrease();
  }
  componentDidMount () {
    console.log(this.state.count);
    if (this.state.count > 0) {
      return;
    }
    setTimeout(() => {
      this.fadeOut(this.background);
    }, 5000);
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
