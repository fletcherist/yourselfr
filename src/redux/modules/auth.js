import { createAction, handleActions } from 'redux-actions';
import fetch from 'isomorphic-fetch';
import { config } from '../config';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOG_IN = 'LOG_IN';
export const SAVE_PREFERENCES = 'SAVE_PREFERENCES';
export const START_SAVING_PREFERENCES = 'START_SAVING_PREFERENCES';
export const STOP_SAVING_PREFERENCES = 'STOP_SAVING_PREFERENCES';
export const LOAD_AVATAR = 'LOAD_AVATAR';
export const REMOVE_AVATAR = 'REMOVE_AVATAR';
export const REMOVE_BACKGROUND = 'REMOVE_BACKGROUND';

export const START_SAVING_USERNAME = 'START_SAVING_USERNAME';
export const STOP_SAVING_USERNAME = 'STOP_SAVING_USERNAME';

export const START_SAVING_ALIAS = 'START_SAVING_ALIAS';
export const STOP_SAVING_ALIAS = 'STOP_SAVING_ALIAS';

export const START_SAVING_STATUS = 'START_SAVING_STATUS';
export const STOP_SAVING_STATUS = 'STOP_SAVING_STATUS';

var defaultMe = {
  authenticated: true,
  isFetching: {
    username: false,
    alias: false,
    status: false
  },
  user: {
    username: 'username',
    alias: 'alias',
    status: 'status'
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
      credentials: 'same-origin',
      body: avatar
    })
    .then((r) => r.json())
    .then((res) => {
      console.log(res);
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
      credentials: 'same-origin',
      body: background
    })
    .then((r) => r.json())
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log('Error catched while attaching a photo', e);
    })
  }
}

export const logIn = createAction(LOG_IN, async (username, password) => {
  var response = await fetch(`${config.http}/auth/login`, {
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
  });

  return response;
})

export const removeAvatar = () => {
  return (dispatch, getState) => {
    fetch(`${config.http}/upload/background/delete`, {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Content-type': config.post
      }
    });
  }
}

export const removeBackground = () => {
  return (dispatch, getState) => {
    fetch(`${config.http}/upload/background/delete`, {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Content-type': config.post
      }
    });
  }
}

export const savePreferencesR = createAction(SAVE_PREFERENCES);

const startSavingUsername = createAction(START_SAVING_USERNAME);
const stopSavingUsername = createAction(STOP_SAVING_USERNAME);
const saveUsername = () => {
  return (dispatch, getState) => {
    dispatch(startSavingUsername());
    setTimeout(() => {
      dispatch(stopSavingUsername());
    }, 1000);
  }
}

const startSavingAlias = createAction(START_SAVING_ALIAS);
const stopSavingAlias = createAction(STOP_SAVING_ALIAS);
const saveAlias = () => {
  return (dispatch, getState) => {
    dispatch(startSavingAlias());
    setTimeout(() => {
      dispatch(stopSavingAlias());
    }, 1000);
  }
}

const startSavingStatus = createAction(START_SAVING_STATUS);
const stopSavingStatus = createAction(STOP_SAVING_STATUS);
const saveStatus = () => {
  return (dispatch, getState) => {
    dispatch(startSavingStatus());
    setTimeout(() => {
      dispatch(stopSavingStatus());
    }, 1000);
  }
}

export const stopSavingPreferences = createAction(STOP_SAVING_PREFERENCES);

const createBody = (user) => {
  var body = ``;
  if (user.username) {
    body += `username=${user.username}&`;
  }
  if (user.alias) {
    body += `alias=${user.alias}&`;
  }
  if (user.status) {
    body += `status=${user.status}`;
  }

  return body;
}

export const savePreferences = (user) => {
  return (dispatch, getState) => {
    console.log('saving Preferences..');
    console.log(user);
    dispatch(savePreferencesR());
    dispatch(startSavingPreferences());

    setTimeout(() => {
      dispatch(stopSavingPreferences());
    }, 3000);

    var body = createBody(user);
    console.log(body);
    //
    // fetch(`${config.http}/api/users`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-type': config.post
    //   },
    //   credentials: 'same-origin',
    //   body: body
    // })
    // .then((r) => r.json())
    // .then((res) => {
    //   console.log(res);
    // })
  }
}

export const actions = {
  authenticate,
  savePreferences,
  loadAvatar,
  loadBackground,
  removeAvatar,
  removeBackground,

  saveUsername,
  saveAlias,
  saveStatus
}

export default handleActions({
  AUTHENTICATE: (state, { payload }) => {
    return {...state, ...payload};
  },
  SAVE_PREFERENCES: (state, action) => {
    return {...state};
  },
  START_SAVING_USERNAME: (state, action) => {
    return {...state, ...{isFetching: {username: true}}};
  },
  STOP_SAVING_USERNAME: (state, action) => {
    return {...state, ...{isFetching: {username: false}}};
  },

  START_SAVING_ALIAS: (state, action) => {
    return {...state, ...{isFetching: {alias: true}}};
  },
  STOP_SAVING_ALIAS: (state, action) => {
    return {...state, ...{isFetching: {alias: false}}};
  },

  START_SAVING_STATUS: (state, action) => {
    return {...state, ...{isFetching: {status: true}}};
  },
  STOP_SAVING_STATUS: (state, action) => {
    return {...state, ...{isFetching: {status: false}}};
  }
}, defaultMe);
