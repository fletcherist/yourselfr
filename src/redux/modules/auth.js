import { createAction, handleActions } from 'redux-actions';
import { config } from '../config';
import { fetchLogIn, fetchRegister } from './isFetching';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOG_IN = 'LOG_IN';

var defaultMe = {
  authenticated: true,
  user: {
    username: '%username%',
    alias: undefined,
    status: undefined
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
      }
    });
  }
}

export const register = (username, email, password) => {
  return (dispatch, getState) => {
    dispatch(fetchRegister([true]));
    console.log('do login');
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
        dispatch(fetchRegister([false, 'Загружаем ваш профиль..']));
      } else {
        dispatch(fetchRegister(false));
      }
    });
  }
}

export const actions = {
  logIn,
  authenticate
}

export default handleActions({
  AUTHENTICATE: (state, { payload }) => {
    return {...state, ...payload};
  }
}, defaultMe);
