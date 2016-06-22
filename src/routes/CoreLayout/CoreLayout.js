import React, { PropTypes } from 'react';
import Background from 'components/Background';
import '../../styles/core.scss'

function CoreLayout ({ children }) {
  return (
    <div>
      <Background />
      <div className='page-container' id='blocks'>
          {children}
      </div>
    </div>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.element
}

export default CoreLayout;
