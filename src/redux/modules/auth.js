import { createAction, handleActions } from 'redux-actions';
import { config } from '../config';
import { fetchLogIn, fetchRegister } from './isFetching';
import { push } from 'react-router-redux';
import ga from 'react-ga';
import cookie from 'react-cookie';

import {
  patchUsername,
  patchAlias,
  patchStatus,
  patchVK,
  patchTumblr,
  patchTwitter,
  patchInstagram,
  patchFacebook
} from './user';

const AUTHENTICATE = 'AUTHENTICATE';
// const LOG_IN = 'LOG_IN';
const IS_YOUR_PAGE = 'IS_YOUR_PAGE';
const CHANGE_USERNAME = 'CHANGE_USERNAME';
const CHANGE_ALIAS = 'CHANGE_ALIAS';
const CHANGE_STATUS = 'CHANGE_STATUS';

export const changeUsername = (username) => {
  return (dispatch) => {
    dispatch(createAction(CHANGE_USERNAME)(username));
    dispatch(patchUsername(username));
  }
}

export const changeAlias = (alias) => {
  return (dispatch) => {
    dispatch(createAction(CHANGE_ALIAS)(alias));
    dispatch(patchAlias(alias));
    cookie.remove('alias', { path: '/' });
    cookie.save('alias', alias, { path: '/' });
  }
}

export const changeStatus = (status) => {
  return (dispatch) => {
    dispatch(createAction(CHANGE_STATUS)(status));
    dispatch(patchStatus(status));
  }
}

const CHANGE_VK = 'CHANGE_VK';
const CHANGE_TUMBLR = 'CHANGE_TUMBLR';
const CHANGE_TWITTER = 'CHANGE_TWITTER';
const CHANGE_INSTAGRAM = 'CHANGE_INSTAGRAM';
const CHANGE_FACEBOOK = 'CHANGE_FACEBOOK';

export const changeVK = (vk) => {
  return (dispatch) => {
    dispatch(createAction(CHANGE_VK)(vk));
    dispatch(patchVK(vk));
  }
}
export const changeTumblr = (tumblr) => {
  return (dispatch) => {
    dispatch(createAction(CHANGE_TUMBLR)(tumblr));
    dispatch(patchTumblr(tumblr));
  }
};
export const changeTwitter = (twitter) => {
  return (dispatch) => {
    dispatch(createAction(CHANGE_TWITTER)(twitter));
    dispatch(patchTwitter(twitter));
  }
};
export const changeInstagram = (instagram) => {
  return (dispatch) => {
    dispatch(createAction(CHANGE_INSTAGRAM)(instagram));
    dispatch(patchInstagram(instagram));
  }
};
export const changeFacebook = (facebook) => {
  return (dispatch) => {
    dispatch(createAction(CHANGE_FACEBOOK)(facebook));
    dispatch(patchFacebook(facebook));
  }
};

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
      instagram: undefined,
      facebook: undefined
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
          cookie.save('background', auth.user.background, { path: '/' });

          // Redirect in case of authenticate status
          var path = window.location.pathname;
          if (auth.authenticated) {
            if (path === '/') {
              dispatch(push(auth.user.alias));
            }
          } else {
            if (path === '/feed' || path === '/preferences') {
              dispatch(push('/'));
            }
          }
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
        dispatch(authenticate());
        setTimeout(() => {
          dispatch(push('/i/get-started'));
        }, 1000);
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
          dispatch(push('/i/get-started'));
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
  },
  CHANGE_USERNAME: (state, { payload }) => {
    return {...state, user: {...state.user, username: payload}}
  },
  CHANGE_ALIAS: (state, { payload }) => {
    return {...state, user: {...state.user, alias: payload}}
  },
  CHANGE_STATUS: (state, { payload }) => {
    return {...state, user: {...state.user, status: payload}}
  },
  CHANGE_VK: (state, { payload }) => {
    return {...state, user: {...state.user, social: {...state.user.social, vk: payload}}};
  },
  CHANGE_TUMBLR: (state, { payload }) => {
    return {...state, user: {...state.user, social: {...state.user.social, tumblr: payload}}};
  },
  CHANGE_TWITTER: (state, { payload }) => {
    return {...state, user: {...state.user, social: {...state.user.social, twitter: payload}}};
  },
  CHANGE_INSTAGRAM: (state, { payload }) => {
    return {...state, user: {...state.user, social: {...state.user.social, instagram: payload}}};
  },
  CHANGE_FACEBOOK: (state, { payload }) => {
    return {...state, user: {...state.user, social: {...state.user.social, facebook: payload}}};
  }
}, defaultMe);
