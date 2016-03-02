import { config } from '../config';
import { fetchUsername,
         fetchAlias,
         fetchStatus,
         fetchAvatar,
         fetchBackground
} from './isFetching';

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
      headers: {'Content-type': config.post}
    });
  }
}

export const saveUsername = (username) => {
  return (dispatch, getState) => {
    dispatch(fetchUsername({status: true}));

    if (username.length === 0) {
      return dispatch(fetchUsername({
        status: false,
        state: false,
        message: 'Поле не может быть пустым!'
      }))
    }
    if (username.length > 30) {
      return dispatch(fetchUsername({
        status: false,
        state: false,
        message: 'Не подходит! Придумайте более короткое имя.'
      }))
    }

    var body = createBody({username: username});
    fetch(`${config.http}/api/users`, {
      method: 'POST',
      headers: {'Content-type': config.post},
      credentials: 'same-origin',
      body: body
    })
    .then((r) => r.json())
    .then((res) => {
      if (res.status) {
      }
      setTimeout(() => {
        dispatch(fetchUsername({
          status: false,
          state: true,
          message: 'Имя успешно обновлено.'
        }));
      }, 1000);
    })
  }
}

export const saveAlias = (alias) => {
  return (dispatch, getState) => {
    dispatch(fetchAlias({status: true}));

    // Check Alias for it's Right!
    var regex = new RegExp(/^[a-z\d_]{1,32}$/g);
    if (!regex.test(alias)) {
      return dispatch(fetchAlias({
        status: false,
        state: false,
        message: 'Только латинские буквы, цифры и _'
      }))
    }

    var body = createBody({alias: alias});
    fetch(`${config.http}/api/users`, {
      method: 'POST',
      headers: {'Content-type': config.post},
      credentials: 'same-origin',
      body: body
    })
    .then((r) => r.json())
    .then((res) => {
      setTimeout(() => {
        dispatch(fetchAlias({
          status: false,
          state: true,
          message: 'Адрес успешно обновлён.'
        }));
      }, 1000);
    })
  }
}

export const saveStatus = (status) => {
  return (dispatch, getState) => {
    dispatch(fetchStatus({status: true}));
    if (status.length > 150) {
      dispatch(fetchStatus({
        status: false,
        state: false,
        message: 'Пожалуйста, не пишите себе так много!'
      }));
    }
    var body = createBody({status: status});
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
      setTimeout(() => {
        dispatch(fetchStatus({
          status: false,
          state: true,
          message: 'Статус успешно обновлён.'
        }));
      }, 1000);
    })
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

// const fetchData = (body) => {
//   fetch(`${config.http}/api/users`, {
//     method: 'POST',
//     headers: {
//       'Content-type': config.post
//     },
//     credentials: 'same-origin',
//     body: body
//   })
//   .then((r) => r.json())
//   .then((res) => {
//     console.log(res);
//   })
// }

export const actions = {
  loadAvatar,
  loadBackground,
  removeAvatar,
  removeBackground,

  saveUsername,
  saveAlias,
  saveStatus
}
