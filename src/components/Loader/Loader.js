import React from 'react';
import s from './Loader.scss';

class Loader extends React.Component {
  render () {
    return (
      <div className={s.container}>
        <div className={s.moon}></div>
      </div>
    )
  }
}

export default Loader;
