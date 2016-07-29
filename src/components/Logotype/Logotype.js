import React, { Component } from 'react'
import s from './Logotype.scss'
import { Link } from 'react-router'

class Logotype extends Component {
  render () {
    return (
      <Link to='/'>
        <div className={s.logotype}></div>
      </Link>
    )
  }
}

export default Logotype
