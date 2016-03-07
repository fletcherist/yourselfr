import React from 'react'
import ReactDOM from 'react-dom'
import { useRouterHistory } from 'react-router'
import { createHistory } from 'history'
import routes from './routes'
import Root from './containers/Root'
import configureStore from './redux/configureStore'
import ga from 'react-ga';
import { config } from 'redux/config';
import { authenticate } from './redux/modules/auth';

import counterpart from 'counterpart';
import { getLocale } from './components/Toools';
// Set Localization Preferences
counterpart.registerTranslations('en', require('./locales/en.json'));
counterpart.registerTranslations('ru', require('./locales/ru.json'));
var locale = getLocale();
if (locale === 'en-US') { locale = 'en'; }
if (locale !== 'en' && locale !== 'ru') { locale = 'ru'; }
counterpart.setLocale(locale);

const historyConfig = { basename: __BASENAME__ }
const history = useRouterHistory(createHistory)(historyConfig)

const initialState = window.__INITIAL_STATE__
const store = configureStore({ initialState, history })

ga.initialize(config.googleAnalyticsId);
history.listen(location => {
  ga.pageview(window.location.pathname);
});
// store.dispatch(logIn('abracadabra', 'abracadabra'));
store.dispatch(authenticate());
// Render the React application to the DOM
ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
)
