// We only need to import the modules necessary for initial render
import React, { Component, PropTypes } from 'react';
import CoreLayout from 'layouts/CoreLayout/CoreLayout';

// Preferences Components
import PreferencesContainer from 'components/Preferences/Container';
import UpdateSocialNetworks from 'components/Preferences/UpdateSocialNetworks';
import PreferencesPhotos from 'components/Preferences/Photos';

import Posts from 'components/Posts';
import User from 'components/User';
import Feed from 'components/Feed';

import Main from 'components/AuthComponents/Main'
import { Signup, Login, AuthBootstrap } from 'components/AuthComponents/AuthBootstrap';

import GetStarted from 'views/GetStarted/GetStarted';
import GetPersonalized from 'views/GetPersonalized/GetPersonalized';
import GetSocialized from 'views/GetSocialized/GetSocialized';
// import ShareWithSocial from 'components/ShareWithSocial';

import Followers from 'components/Subscriptions/Followers';
import Following from 'components/Subscriptions/Following';
// import UserNavigation from 'components/UserNavigation';

import NotFoundView from 'views/NotFoundView/NotFoundView';
import Preferences from 'components/Preferences';

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */
const getStartedRoute = {
  path: '/i/get-started',
  indexRoute: {
    component: GetStarted
  }
}

const getPersonalizedRoute = {
  path: '/i/get-personalized',
  indexRoute: {
    component: GetPersonalized
  }
}

const getSocializedRoute = {
  path: '/i/get-socialized',
  indexRoute: {
    component: GetSocialized
  }
}

export const createRoutes = (store) => ({
  path: '',
  component: CoreLayout,
  indexRoute: {
    component: Main
  },
  childRoutes: [
    {
      path: '/',
      component: AuthBootstrap,
      indexRoute: {
        component: Main
      }
    },
    {
      path: '/login',
      component: AuthBootstrap,
      indexRoute: {
        component: Login
      }
    },
    {
      path: '/signup',
      component: AuthBootstrap,
      indexRoute: {
        component: Signup
      }
    },
    {
      path: '/404',
      indexRoute: {
        component: NotFoundView
      }
    },
    {
      path: '/feed',
      indexRoute: {
        component: Feed
      }
    },
    {
      path: '/preferences',
      component: PreferencesContainer,
      indexRoute: {
        component: Preferences
      },
      childRoutes: [
        {
          path: 'photos',
          indexRoute: {
            component: PreferencesPhotos
          }
        },
        {
          path: 'social',
          indexRoute: {
            component: UpdateSocialNetworks
          }
        }
      ]
    },
    {
      path: ':user',
      component: User,
      indexRoute: {
        component: Posts
      },
      childRoutes: [
        {
          path: 'followers',
          indexRoute: {
            component: Followers
          }
        },
        {
          path: 'following',
          indexRoute: {
            component: Following
          }
        }
      ]
    },
    getStartedRoute,
    getPersonalizedRoute,
    getSocializedRoute
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
