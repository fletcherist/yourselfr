import React from 'react'
import Slideshow from 'components/Slideshow/Slideshow';
import s from './NotFoundView.scss';
import Navigation from 'components/Navigation';

export class NotFoundView extends React.Component {
  render () {
    return (
      <div className='container text-center'>
        <Slideshow/>
        <Navigation/>
        <div className={s.title}>Oops.<br/> Wrong hole.</div>
      </div>
    )
  }
}

export default NotFoundView
