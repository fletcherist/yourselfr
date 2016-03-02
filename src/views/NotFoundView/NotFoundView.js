import React from 'react'
import { Link } from 'react-router';
import Slideshow from 'components/Slideshow/Slideshow';

export class NotFoundView extends React.Component {
  render () {
    return (
      <div className='container text-center'>
        <Slideshow/>
        <h1>404</h1>
        <Link to='/'>Домой</Link>
      </div>
    )
  }
}

export default NotFoundView
