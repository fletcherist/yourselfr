import React from 'react';
import s from './Loader.scss';

class Loader extends React.Component {
  shouldComponentUpdate () {
    return false;
  }
  render () {
    return (
      <div className={s.spinner}></div>
    )
  }
}

export default Loader;
