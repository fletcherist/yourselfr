import React from 'react'
import { Link } from 'react-router';
import Slideshow from 'components/Slideshow/Slideshow';

export class NotFoundView extends React.Component {
  render () {
    return (
      <div className='container text-center'>
        <Slideshow/>
        <div>Это не та страница, которую Вы хотели бы увидеть. Воспользуйтесь поиском, который мы скоро добавим. Наверное</div>
        <Link to='/'>Домой</Link>
      </div>
    )
  }
}

export default NotFoundView
