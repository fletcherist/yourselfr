import React, { Component } from 'react'
import s from './NoData.scss'
import Translate from 'react-translate-component'

class NoPosts extends Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    return (
      <div className={s.noData}>
        <Translate content='NoData.NoFeed' />
      </div>
    )
  }
}

export default NoPosts
