// We only need to import the modules necessary for initial render
import CoreLayout from 'layouts/CoreLayout/CoreLayout';

// Preferences Components
// import PreferencesContainer from 'components/Preferences/Container';
// import UpdateSocialNetworks from 'components/Preferences/UpdateSocialNetworks';
// import PreferencesPhotos from 'components/Preferences/Photos';

// import Posts from 'components/Posts';
// import User from 'components/User';
import Feed from 'components/Feed';

import User from './User';
import Preferences from './Preferences';

import Main from 'components/AuthComponents/Main'
import { Signup, Login, AuthBootstrap } from 'components/AuthComponents/AuthBootstrap';

// import ShareWithSocial from 'components/ShareWithSocial';

// import Followers from 'components/Subscriptions/Followers';
// import Following from 'components/Subscriptions/Following';
// import UserNavigation from 'components/UserNavigation';

import NotFoundView from 'views/NotFoundView/NotFoundView';

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */
import GetStarted from './GetStarted';
import GetPersonalized from './GetPersonalized';
import GetSocialized from './GetSocialized';

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
    Preferences(store),
    User(store),
    GetStarted(store),
    GetPersonalized(store),
    GetSocialized(store)
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

export default createRoutes;
