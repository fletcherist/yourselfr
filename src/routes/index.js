import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout';
import HomeView from 'views/HomeView/HomeView';
import NotFoundView from 'views/NotFoundView/NotFoundView';
import Preferences from 'components/Preferences';

import WriteBox from 'components/WriteBox';
import Posts from 'components/Posts';
import User from 'components/User';

import LoginForm from 'components/AuthComponents/Login';
import SignupForm from 'components/AuthComponents/Signup';

import { requireAuthentication } from 'components/Authenticate';

import Followers from 'components/Followers';
import Following from 'components/Following';

class defaultUser extends React.Component {
  render () {
    return (
      <div>
          <WriteBox/>
          <Posts/>
      </div>
    )
  }
}

class PreferencesFull extends React.Component {
  render () {
    return (
      <User>
        <Preferences/>
      </User>
    )
  }
}

const LoginPage = () => {
  return (
    <HomeView>
      <LoginForm/>
    </HomeView>
  )
}

const SignupPage = () => {
  return (
    <HomeView>
      <SignupForm/>
    </HomeView>
  )
}

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={SignupPage} />
    <Route path='/404' component={NotFoundView} />
    <Route path='/login' component={LoginPage} />
    <Route path='/signup' component={SignupPage} />
    <Route path='preferences' component={PreferencesFull} />
    <Route path='/:user' component={User} >
      <IndexRoute component={defaultUser}/>
      <Route path='followers' component={Followers} />
      <Route path='following' component={Following} />
    </Route>
    <Redirect from='*' to='/404' />
  </Route>
)
