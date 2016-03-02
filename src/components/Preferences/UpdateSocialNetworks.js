import React from 'react';
// import s from './Preferences.scss';
import { connect } from 'react-redux';
// import classNames from 'classnames/bind';

class UpdateSocialNetworks extends React.Component {
  render () {
    return (
      <div>
        <div>
          VK
          <input/>
        </div>
        <div>
          TWITTER
          <input/>
        </div>
        <div>
          TUMBLR
          <input/>
        </div>
        <div>
          INSTAGRAM
          <input/>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    isFetching: state.isFetching
  }
}

function mapDispatchToProps (dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateSocialNetworks);
