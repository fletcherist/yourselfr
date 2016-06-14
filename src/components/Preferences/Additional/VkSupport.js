import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { formatVK } from 'components/Toools';

class vkSupport extends Component {
  static propTypes = {
    vk: PropTypes.string
  };
  shouldComponentUpdate () {
    return false;
  }

  render () {
    if (!this.props.vk) {
      return (null);
    }
    var vk = formatVK(this.props.vk);
    var link = `http://vk.com/${vk}`;
    return (
      <div className='text-grey'>
        страница вконтакте:
        {' '}
        <a href={link}><b>{link}</b></a>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    vk: state.auth.user.social.vk
  }
}
export default connect(mapStateToProps)(vkSupport);
