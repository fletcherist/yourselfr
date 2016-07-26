import React, { PropTypes } from 'react'
import '../../styles/core.scss'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'

const palette = {
  yoColor: '#0088cc',
  yoGreen: '#4CAF50',
  white: '#ffffff'
}

const muiTheme = getMuiTheme({
  appBar: {
    height: 50,
    fontSize: 19
  },
  raisedButton: {
    textColor: palette.yoColor,
    primaryColor: palette.yoColor,
    primaryTextColor: palette.white,
    fontWeight: 300
  },
  flatButton: {
    textColor: palette.yoColor,
    primaryTextColor: palette.yoGreen,
    fontSize: 12,
    fontWeight: 700
  }
})

function CoreLayout ({ children }) {
  return (
    <div>
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className='page-container' id='blocks'>
          {children}
        </div>
      </MuiThemeProvider>
    </div>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.element
}

export default CoreLayout
