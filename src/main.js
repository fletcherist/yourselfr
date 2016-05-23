import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'

import ga from 'react-ga';
import { config } from 'redux/config';
import { authenticate, isYourPage } from './redux/modules/auth';

import cookie from 'react-cookie';
import counterpart from 'counterpart';
import { getLocale } from './components/Toools';

import Perf from 'react-addons-perf';
console.log(Perf);
window.Perf = Perf;
// Set Localization Preferences
counterpart.registerTranslations('en', require('./locales/en.json'));
counterpart.registerTranslations('ru', require('./locales/ru.json'));

var locale = cookie.load('locale');
if (!locale) {
  locale = getLocale();
}

if (locale === 'en-US') { locale = 'en'; }
if (locale !== 'en' && locale !== 'ru') { locale = 'ru'; }
counterpart.setLocale(locale);

// ========================================================
// Browser History Setup
// ========================================================
const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__
})

// ========================================================
// Store and History Instantiation
// ========================================================
// Create redux store and sync with react-router-redux. We have installed the
// react-router-redux reducer under the routerKey "router" in src/routes/index.js,
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState, browserHistory)
store.dispatch(isYourPage());
store.dispatch(authenticate());

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router
})

ga.initialize(config.googleAnalyticsId);
history.listen(location => {
  ga.pageview(window.location.pathname);
  store.dispatch(isYourPage());
});

// ========================================================
// Developer Tools Setup
// ========================================================
if (__DEBUG__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }
}

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = (routerKey = null) => {
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <AppContainer
      store={store}
      history={history}
      routes={routes}
      routerKey={routerKey}
    />,
    MOUNT_NODE
  )
}

// Enable HMR and catch runtime errors in RedBox
// This code is excluded from production bundle
if (__DEV__ && module.hot) {
  const renderApp = render
  const renderError = (error) => {
    const RedBox = require('redbox-react')

    ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
  }
  render = () => {
    try {
      renderApp(Math.random())
    } catch (error) {
      renderError(error)
    }
  }
  module.hot.accept(['./routes/index'], () => render())
}

// ========================================================
// Go!
// ========================================================
render()
