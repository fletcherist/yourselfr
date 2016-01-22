import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import {Component} from 'react';

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import HomeView from 'views/HomeView/HomeView'
import NotFoundView from 'views/NotFoundView/NotFoundView'
import ContactPage from 'components/ContactPage'

class Profile extends Component {
  render () {
    return <h1>Hello World</h1>
  }
}

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path='/404' component={NotFoundView} />
    <Route path='/user' component={ContactPage} />
    <Redirect from='*' to='/404' />
  </Route>
)
