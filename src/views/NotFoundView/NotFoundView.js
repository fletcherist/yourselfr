import React from 'react'
// import Slideshow from 'components/Slideshow/Slideshow';
import s from './NotFoundView.scss';
import Navigation from 'components/Navigation';

export class NotFoundView extends React.Component {
  render () {
    return (
      <div className='container text-center'>
        <Navigation />
        <div className={s.title}>404</div>
      </div>
    )
  }
}

export default NotFoundView
