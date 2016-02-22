import { createAction, handleActions } from 'redux-actions';
import fetch from 'isomorphic-fetch';
import { config } from '../config';
import { fetchUsername,
         fetchAlias,
         fetchStatus,
         fetchAvatar,
         fetchBackground,
         fetchLogIn
} from './isFetching';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOG_IN = 'LOG_IN';
export const LOAD_AVATAR = 'LOAD_AVATAR';
export const REMOVE_AVATAR = 'REMOVE_AVATAR';
export const REMOVE_BACKGROUND = 'REMOVE_BACKGROUND';

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
    dispatch(fetchAvatar(true));
    fetch(`${config.http}/upload/avatar`, {
      method: 'post',
      credentials: 'same-origin',
      body: avatar
    })
    .then((r) => r.json())
    .then((res) => {
      dispatch(fetchAvatar(false));
      console.log(res);
    })
    .catch((e) => {
      console.log('Error catched while attaching a photo', e);
    })
  }
}

export const loadBackground = (background) => {
  return (dispatch, getState) => {
    console.log('saving uploading background..');
    dispatch(fetchBackground(true));
    fetch(`${config.http}/upload/background`, {
      method: 'post',
      credentials: 'same-origin',
      body: background
    })
    .then((r) => r.json())
    .then((res) => {
      dispatch(fetchBackground(false));
      console.log(res);
    })
    .catch((e) => {
      console.log('Error catched while attaching a photo', e);
    })
  }
}

// const logInAction = createAction(LOG_IN);
export const logIn = (username, password) => {
  return (dispatch, getState) => {
    dispatch(fetchLogIn(true));
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
        dispatch(fetchLogIn([false, 'Неправильный логин или пароль.']));
      } else {
        dispatch(fetchLogIn(false));
      }
    });
  }
}

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

const saveUsername = (username) => {
  return (dispatch, getState) => {
    dispatch(fetchUsername(true));

    var body = createBody({username: username});
    fetchData(body);
    setTimeout(() => {
      dispatch(fetchUsername(false));
    }, 1000);
  }
}

const saveAlias = (alias) => {
  return (dispatch, getState) => {
    dispatch(fetchAlias(true));
    setTimeout(() => {
      dispatch(fetchAlias(false));
    }, 1000);
  }
}

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
  logIn,
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
  }
}, defaultMe);
