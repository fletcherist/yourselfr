import React from 'react'
// import Slideshow from 'components/Slideshow/Slideshow';
import s from './404.scss'
import Navbar from 'components/Navigation/Navbar'

import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router'

export class NotFoundView extends React.Component {
  render () {
    return (
      <div className='container text-center'>
        <Navbar />
        <div className={s.title}>404</div>
        <div className={s.sub}>Здесь могла бы быть ваша реклама</div>
        <Link to='/'>
          <FlatButton label='найти себя'/>
        </Link>
      </div>
    )
  }
}

export default NotFoundView
