import CoreLayout from './CoreLayout';

import User from './User';
import Preferences from './Preferences';
import Feed from './Feed';

import Login from './AuthComponents/Login';
import Signup from './AuthComponents/Signup';
import Main from './AuthComponents/Main';

import p404 from './404';
import GetStarted from './Startpages/GetStarted';
import GetPersonalized from './Startpages/GetPersonalized';
import GetSocialized from './Startpages/GetSocialized';

export const createRoutes = (store) => ({
  path: '',
  component: CoreLayout,
  childRoutes: [
    Main(store),
    Login(store),
    Signup(store),
    p404(store),
    Feed(store),
    Preferences(store),
    User(store),
    GetStarted(store),
    GetPersonalized(store),
    GetSocialized(store)
  ]
})

export default createRoutes;
