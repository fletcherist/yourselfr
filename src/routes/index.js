import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import CoreLayout from 'layouts/CoreLayout/CoreLayout';
import HomeView from 'views/HomeView/HomeView';
import NotFoundView from 'views/NotFoundView/NotFoundView';
import Preferences from 'components/Preferences';

// Preferences Components
import UpdateSocialNetworks from 'components/Preferences/UpdateSocialNetworks';
import { PreferencesContainer } from 'components/Preferences';
import { PreferencesPhotos } from 'components/Preferences';

import WriteBox from 'components/WriteBox';
import Posts from 'components/Posts';
import User from 'components/User';

import LoginForm from 'components/AuthComponents/Login';
import SignupForm from 'components/AuthComponents/Signup';

import GetStarted from 'views/GetStarted/GetStarted';
import GetPersonalized from 'views/GetPersonalized/GetPersonalized';
import GetSocialized from 'views/GetSocialized/GetSocialized';

import ShareWithSocial from 'components/ShareWithSocial';

import { requireAuthentication } from 'components/Authenticate';

import Followers from 'components/Subscriptions/Followers';
import Following from 'components/Subscriptions/Following';

import UserNavigation from 'components/UserNavigation';

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

class ShareWithSocialContainer extends React.Component {
  render () {
    return (
      <User>
        <div className='container--right'>
          <h3>Привлекайте людей, рассказывая о Вас в соцсетях.</h3>
          <ShareWithSocial/>
        </div>
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

// <Route path='/i/get-started' component={requireAuthentication(GetStarted)} />
// <Route path='/i/get-personalized' component={requireAuthentication(GetPersonalized)} />
// <Route path='/i/get-socialized' component={requireAuthentication(GetSocialized)} />

// <Route path='/i/get-started' component={GetStarted} />
// <Route path='/i/get-personalized' component={GetPersonalized} />
// <Route path='/i/get-socialized' component={GetSocialized} />

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={SignupPage} />
    <Route path='/404' component={NotFoundView} />
    <Route path='/login' component={LoginPage} />
    <Route path='/signup' component={SignupPage} />
    <Route path='/preferences' component={PreferencesContainer}>
      <IndexRoute component={Preferences} />
      <Route path='social' component={UpdateSocialNetworks} />
      <Route path='photos' component={PreferencesPhotos} />
    </Route>
    <Route path='/nav' component={UserNavigation} />
      <Route path='/share-with-social' component={ShareWithSocialContainer} />

    <Route path='/i/get-started' component={requireAuthentication(GetStarted)} />
    <Route path='/i/get-personalized' component={requireAuthentication(GetPersonalized)} />
    <Route path='/i/get-socialized' component={requireAuthentication(GetSocialized)} />

    <Route path='/:user' component={User} >
      <IndexRoute component={defaultUser}/>
      <Route path='followers' component={Followers} />
      <Route path='following' component={Following} />
    </Route>
    <Redirect from='*' to='/404' />
  </Route>
);
