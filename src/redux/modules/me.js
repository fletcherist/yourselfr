import { createAction, handleActions } from 'redux-actions';
import fetch from 'isomorphic-fetch';
import { config } from '../config';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOG_IN = 'LOG_IN';
export const SAVE_PREFERENCES = 'SAVE_PREFERENCES';

var defaultMe = {
  authenticated: false,
  username: 'hellowa',
  alias: 'asddeee',
  status: 'status n rock'
}

export const authenticate = createAction(AUTHENTICATE, async (me = {}) => {
  me = await fetch(`${config.http}/auth/`)
    .then((r) => r.json())
    .catch((e) => {
      console.log(e);
    })
    .then((res) => {
      return res;
    });

  return me;
});

export const logIn = createAction(LOG_IN, async (username, password) => {
  var response = await fetch(`${config.http}/auth/login`, {
    method: 'POST',
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
export const savePreferences = () => {
  return (dispatch, getState) => {
    console.log('saving Preferences..');
  }
}

export const actions = {
  authenticate,
  savePreferences
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
  AUTHENTICATE: (state, action) => {
    return action.payload;
  },
  SAVE_PREFERENCES: (state, action) => {
    return {...state};
  }
}, defaultMe);
