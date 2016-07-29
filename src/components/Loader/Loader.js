import React from 'react'
import cx from 'classnames'
import s from './Loader.scss'

class Loader extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    return (
      <div className={s.spinner}></div>
    )
  }
}

export const LoaderSmall = () => (
  <div className={cx(s.spinner, s.spinnerSmall)}></div>
)

export default Loader
