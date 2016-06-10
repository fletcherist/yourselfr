import React, { Component } from 'react';

import lay1 from './Layout1.jpg';
import lay2 from './Layout2.jpg';
import lay3 from './Layout3.jpg';
import lay4 from './Layout4.jpg';
import lay5 from './Layout5.jpg';

var backgrounds = [lay1, lay2, lay3, lay4, lay5];

class Slideshow extends Component {
  componentWillMount () {
    this.setState({
      style: {
        background: `url(${backgrounds[2]})`
      },
      backgroundCount: 1,
      count: 0
    });
  }
  fadeOut (element) {
    var opacity = 1;

    var self = this;
    function decrease () {
      opacity -= 0.01;
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
        console.log('decreasing ' + opacity)
        self.fadeIn(element);
        return false;
      }
      element.style.opacity = opacity;
      requestAnimationFrame(decrease);
    }
    decrease();
  }

  fadeIn (element) {
    var opacity = 0;

    var self = this;
    function increase () {
      opacity += 0.01;
      if (opacity >= 1) {
        element.style.opacity = 1;

        setTimeout(() => {
          self.fadeOut(element);
        }, 5000);
        return false;
      }
      element.style.opacity = opacity;
      requestAnimationFrame(increase);
    }
    increase();
  }
  componentDidMount () {
    // console.log(this.state.count);
    // if (this.state.count > 0) {
      // return false;
    // }
    var element = document.querySelector('#slideshow');
    console.log(element);
    this.timeout = setTimeout(() => {
      this.fadeOut(element);
    }, 5000);
  }
  componentWillUpdate () {
    return false;
  }
  shouldComponentUpdate () {
    // return false;
    return true;
  }
  componentWillUnmount () {
    return false;
  }

  render () {
    return (
      <div>
        <div className='black_layout' style={{backgroundColor: 'black'}}></div>
        <div
          className='responsive_crop_main'
          style={this.state.style}
          id='slideshow'
          ref={(c) => this.slideshow = c}>
        </div>
      </div>
    )
  }
}

export default Slideshow;
