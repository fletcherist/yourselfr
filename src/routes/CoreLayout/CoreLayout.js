import React, { PropTypes } from 'react'
import '../../styles/core.scss'

function CoreLayout ({ children }) {
  return (
    <div>
      <div className='page-container' id='blocks'>
          {children}
      </div>
    </div>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.element
}

export default CoreLayout
