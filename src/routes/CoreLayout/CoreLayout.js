import React, { PropTypes } from 'react'
import '../../styles/core.scss'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'

import { palette } from 'store/config'

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
  },
  toggle: {
    thumbOnColor: palette.yoColor,
    trackOnColor: palette.black
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
