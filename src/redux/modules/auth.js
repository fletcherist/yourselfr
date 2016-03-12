import { createAction, handleActions } from 'redux-actions';
import { config } from '../config';
import { fetchLogIn, fetchRegister } from './isFetching';
import { routeActions } from 'react-router-redux';
import ga from 'react-ga';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOG_IN = 'LOG_IN';

var defaultMe = {
  authenticated: true,
  user: {
    username: '%username%',
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

export const authenticatePatch = createAction(AUTHENTICATE);
export const authenticate = () => {
  return (dispatch, getState) => {
    fetch(`${config.http}/auth`, {credentials: 'same-origin'})
      .then((r) => r.json())
      .then((res) => {
        console.log(res);
        var auth = res;
        // if (res.authenticated === false) {
        //   auth = {
        //     authenticated: true,
        //     user: {
        //       username: 'John R.Ruel Tolkien',
        //       alias: 'tolkien',
        //       status: 'I am a kind of an idol'
        //     }
        //   }
        // }
        return dispatch(authenticatePatch(auth));
      });
  }
}

// const logInAction = createAction(LOG_IN);
export const logIn = (username, password) => {
  return (dispatch, getState) => {
    dispatch(fetchLogIn([true]));
    fetch(`${config.http}/auth/login`, {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Content-type': config.post
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
  }
}, defaultMe);
