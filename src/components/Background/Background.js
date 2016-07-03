import React, { Component, PropTypes } from 'react';
<<<<<<< HEAD
import { config } from '../../store/config';
import { connect } from 'react-redux';
=======
import { config } from '../../redux/config';
>>>>>>> origin/master

class Background extends Component {
  static propTypes = {
    background: PropTypes.string
  };
<<<<<<< HEAD
  componentWillMount () {
    this.setBackground();
  }
  componentWillReceiveProps () {
    this.setBackground();
  }
  setBackground () {
    console.log(this.props.background);
    var self = this;
    if (!this.props.background) {
      self.setState({
        background: ''
      })
      return;
    }
    var blurred = `${config.http}/upload/background_blur/${this.props.background}`;
    var original = `${config.http}/upload/background/${this.props.background}`;

    self.setState({
      background: blurred,
      filter: 'blur(10px)'
    });
    // 2: load large image
    var imgLarge = new Image();
    imgLarge.src = original;
    imgLarge.onload = function () {
      self.setState({
        background: original,
        filter: 'none'
      });
    };
  }
  render () {
    if (!this.props.background) {
      return (
        <div className='responsive_crop_fixed' id='background'></div>
      );
    }
    return (
      <div
        className='responsive_crop_fixed'
        style={{
          background: `url(${this.state.background})`,
          WebkitFilter: this.state.filter,
          WebkitTransition: '-webkit-filter .8s'
        }}
        id='background'>
      </div>
=======

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
>>>>>>> origin/master
    )
  }
}

<<<<<<< HEAD
function mapStateToProps (state) {
  if (state.user) {
    return {
      background: state.user.background
    }
  }
  return {}
}
export default connect(mapStateToProps)(Background);
=======
export default Background;
>>>>>>> origin/master
