import React from 'react';
import s from './SmileBox.css';

class SmileBox extends React.Component {
  render () {
    return (
      <div>
        <div className={s.button}>😈asdads</div>
        <Smiles />
      </div>
    )
  }
}

class Smiles extends React.Component {
  render () {
    return (
      <div className={s.list}>
        набор смайликов
      </div>
    )
  }
}

export default SmileBox;
