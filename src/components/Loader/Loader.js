import React from 'react';
import s from './Loader.scss';

class Loader extends React.Component {
  render () {
    return (
      <div className={s.spinner}></div>
    )
  }
}

export default Loader;
