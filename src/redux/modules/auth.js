import { createAction, handleActions } from 'redux-actions';
import fetch from 'isomorphic-fetch';
import { config } from '../config';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOG_IN = 'LOG_IN';
export const LOAD_AVATAR = 'LOAD_AVATAR';
export const REMOVE_AVATAR = 'REMOVE_AVATAR';
export const REMOVE_BACKGROUND = 'REMOVE_BACKGROUND';

export const FETCH_USERNAME = 'FETCH_USERNAME';
export const FETCH_ALIAS = 'FETCH_ALIAS';
export const FETCH_STATUS = 'FETCH_STATUS';

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

const fetchUsername = createAction(FETCH_USERNAME);
const saveUsername = (username) => {
  return (dispatch, getState) => {
    dispatch(fetchUsername(true));

    var body = createBody({username: username});
    fetchData(body);
    fetchData
    setTimeout(() => {
      dispatch(fetchUsername(false));
    }, 1000);
  }
}

const fetchAlias = createAction(FETCH_ALIAS);
const saveAlias = (alias) => {
  return (dispatch, getState) => {
    dispatch(fetchAlias(true));
    setTimeout(() => {
      dispatch(fetchAlias(false));
    }, 1000);
  }
}

const fetchStatus = createAction(FETCH_STATUS);
const saveStatus = (status) => {
  return (dispatch, getState) => {
    dispatch(fetchStatus(true));
    setTimeout(() => {
      dispatch(fetchStatus(false));
    }, 1000);
  }
}

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

const fetchData = (body) => {
  fetch(`${config.http}/api/users`, {
    method: 'POST',
    headers: {
      'Content-type': config.post
    },
    credentials: 'same-origin',
    body: body
  })
  .then((r) => r.json())
  .then((res) => {
    console.log(res);
  })
}

export const actions = {
  authenticate,
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

  FETCH_USERNAME: (state, {payload}) => {
    return Object.assign({}, state, {
      isFetching: Object.assign({}, state.isFetching, {
        username: payload
      })
    })
  },

  FETCH_ALIAS: (state, {payload}) => {
    return Object.assign({}, state, {
      isFetching: Object.assign({}, state.isFetching, {
        alias: payload
      })
    })
  },

  FETCH_STATUS: (state, {payload}) => {
    return Object.assign({}, state, {
      isFetching: Object.assign({}, state.isFetching, {
        status: payload
      })
    })
  }
}, defaultMe);
