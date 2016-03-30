import { createAction, handleActions } from 'redux-actions';
import { config } from '../config';
import { fetchLogIn, fetchRegister } from './isFetching';
import { routeActions } from 'react-router-redux';
import ga from 'react-ga';
import cookie from 'react-cookie';

const AUTHENTICATE = 'AUTHENTICATE';
// const LOG_IN = 'LOG_IN';
const IS_YOUR_PAGE = 'IS_YOUR_PAGE';

var defaultMe = {
  authenticated: false,
  isYourPage: true,
  user: {
    username: undefined,
    alias: undefined,
    status: undefined,
    social: {
      vk: undefined,
      twitter: undefined,
      tumblr: undefined,
      instagram: undefined
    }
  }
}

const isYourPagePatch = createAction(IS_YOUR_PAGE);
export const isYourPage = () => {
  return (dispatch, getState) => {
    var isYourPage = false;
    var alias = window.location.pathname.substr(1);
    alias = alias.split('/')[0];

    var authenticated = cookie.load('authenticated');
    var userAlias = cookie.load('alias');
    console.log(authenticated, userAlias);
    if (authenticated === true && userAlias === alias) {
      isYourPage = true;
    }
    dispatch(isYourPagePatch(isYourPage));
  }
}

export const authenticatePatch = createAction(AUTHENTICATE);
export const authenticate = () => {
  return (dispatch, getState) => {
    fetch(`${config.http}/auth`, {credentials: 'include'})
      .then((r) => r.json())
      .then((res) => {
        var auth = res;

        cookie.save('authenticated', auth.authenticated, { path: '/' });

        if (auth.user) {
          cookie.save('alias', auth.user.alias, { path: '/' });
        }
        dispatch(authenticatePatch(auth));
      });
  }
}

// const logInAction = createAction(LOG_IN);
export const logIn = (username, password) => {
  return (dispatch, getState) => {
    dispatch(fetchLogIn([true]));
    fetch(`${config.http}/auth/login`, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      body: `username=${username}&password=${password}`
    })
    .then((r) => r.json())
    .catch((e) => {
      console.log(e);
    })
    .then((res) => {
      console.log(res);
      if (res.state === 'failure') {
        dispatch(fetchLogIn([false, 'Неправильный логин или пароль.']));
      } else {
        dispatch(fetchLogIn([true]));
        window.location.href = '/findme';
        ga.event({
          category: 'User',
          action: 'Logged In'
        });
      }
    });
  }
}

export const register = (username, email, password) => {
  return (dispatch, getState) => {
    console.log(username, email, password);
    dispatch(fetchRegister([true]));
    console.log('do login');

    if (password.length < 6) {
      return dispatch(fetchRegister([false, 'Допишите к паролю ещё пару символов.']))
    }
    fetch(`${config.http}/auth/signup`, {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Content-type': config.post
      },
      body: `username=${username}&password=${password}&email=${email}`
    })
    .then((r) => r.json())
    .catch((e) => {
      console.log(e);
    })
    .then((res) => {
      console.log(res);
      if (res.state === 'failure') {
        dispatch(fetchRegister([false, 'Загружаем ваш профиль..']));
      } else {
        dispatch(fetchRegister(false));
        dispatch(authenticate());
        setTimeout(() => {
          dispatch(routeActions.push('/i/get-started'));
        }, 1000);
        ga.event({
          category: 'User',
          action: 'Created an Account'
        });
      }
    });
  }
}

export const actions = {
  logIn,
  authenticate,
  register
}

export default handleActions({
  AUTHENTICATE: (state, { payload }) => {
    return {...state, ...payload};
  },
  IS_YOUR_PAGE: (state, { payload }) => {
    return {...state, isYourPage: payload}
  }
}, defaultMe);
