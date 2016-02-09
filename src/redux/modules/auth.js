import { createAction, handleActions } from 'redux-actions';
import fetch from 'isomorphic-fetch';
import { config } from '../config';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOG_IN = 'LOG_IN';
export const SAVE_PREFERENCES = 'SAVE_PREFERENCES';
export const START_SAVING_PREFERENCES = 'START_SAVING_PREFERENCES';
export const LOAD_AVATAR = 'LOAD_AVATAR';

var defaultMe = {
  authenticated: true,
  user: {
    username: 'hellowa',
    alias: 'asddeee',
    status: 'status n rock'
  }
}

export const authenticate = createAction(AUTHENTICATE, async (auth = {}) => {
  auth = await fetch(`${config.http}/auth`, {credentials: 'same-origin'})
    .then((r) => r.json())
    .catch((e) => {
      console.log(e);
    })
    .then((res) => {
      console.log(res);
      return res;
    });

  return auth;
});

export const loadAvatar = (avatar) => {
  return (dispatch, getState) => {
    console.log('saving uploading avatar..');
    fetch(`${config.http}/upload/avatar`, {
      method: 'post',
      body: avatar
    })
    .then((r) => r.json())
    .then((res) => {
      console.log('its works' + res);
    })
    .catch((e) => {
      console.log('Error catched while attaching a photo', e);
    })
  }
}

export const loadBackground = (background) => {
  return (dispatch, getState) => {
    console.log('saving uploading avatar..');
    fetch(`${config.http}/upload/background`, {
      method: 'post',
      body: background
    })
    .then((r) => r.json())
    .then((res) => {
      console.log('its works' + res);
    })
    .catch((e) => {
      console.log('Error catched while attaching a photo', e);
    })
  }
}

export const logIn = createAction(LOG_IN, async (username, password) => {
  var response = await fetch(`${config.http}/auth/login`, {
    method: 'POST',
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
  });

  return response;
})

export const savePreferencesR = createAction(SAVE_PREFERENCES);
export const startSavingPreferences = createAction(START_SAVING_PREFERENCES);

export const savePreferences = (user) => {
  return (dispatch, getState) => {
    console.log('saving Preferences..');
    console.log(user);
    fetch(`${config.http}/api/users`, {
      method: 'POST',
      headers: {
        'Content-type': config.post
      },
      credentials: 'same-origin',
      body: `username=${user.username}&alias=${user.alias}&status=${user.status}`
    })
    .then((r) => r.json())
    .then((res) => {
      console.log(res);
    })
  }
}

export const actions = {
  authenticate,
  savePreferences,
  loadAvatar,
  loadBackground
}
//
// export default function reducer (state = defaultMe, action) {
//   switch (action.type) {
//     case 'AUTHENTICATE':
//       return {...state, ...{authenticated: true}};
//     case 'LOGOUT':
//       return {...state, ...{authenticated: false}};
//     default:
//       return state;
//   }
// }

export default handleActions({
  AUTHENTICATE: (state, { payload }) => {
    return {...state, ...payload};
  },
  SAVE_PREFERENCES: (state, action) => {
    return {...state};
  },
  START_SAVING_PREFERENCES: (state, action) => {
    return state;
  }
}, defaultMe);
