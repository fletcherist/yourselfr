import React, { PropTypes } from 'react'
import '../../styles/core.scss'

function CoreLayout ({ children }) {
  return (
    <div>
        {children}
    </div>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.element
}

export default CoreLayout
