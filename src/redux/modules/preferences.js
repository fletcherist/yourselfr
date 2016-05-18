import { config } from '../config';
import { fetchUsername,
         fetchAlias,
         fetchStatus
} from './isFetching';

import {
  changeUsername,
  changeAlias,
  changeStatus
} from './auth';


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

    dispatch(changeUsername(username));
    var body = createBody({username: username});
    console.log(username);
    fetch(`${config.http}/api/users`, {
      method: 'POST',
      headers: {'Content-type': config.post},
      credentials: 'include',
      body: body
    })
    .then((r) => r.json())
    .then((res) => {
      console.log(res);
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

    dispatch(changeAlias(alias));
    var body = createBody({alias: alias});
    fetch(`${config.http}/api/users`, {
      method: 'POST',
      headers: {'Content-type': config.post},
      credentials: 'include',
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
  console.log(status);
  return (dispatch, getState) => {
    dispatch(fetchStatus({status: true}));
    if (!status) {
      status = '';
    }
    if (status.length > 250) {
      dispatch(fetchStatus({
        status: false,
        state: false,
        message: 'Пожалуйста, не пишите себе так много!'
      }));
    }
    dispatch(changeStatus(status));

    var body = createBody({status: status});
    fetch(`${config.http}/api/users`, {
      method: 'POST',
      headers: {
        'Content-type': config.post
      },
      credentials: 'include',
      body: body
    })
    .then((r) => r.json())
    .then((res) => {
      console.log(res);
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
  if (user.username) { body += `username=${user.username}&`; }
  if (user.alias) { body += `alias=${user.alias}&`; }
  if (user.status) { body += `status=${user.status}&`; }
  if (user.vk) { body += `vk=${user.vk}&`; }
  if (user.twitter) { body += `twitter=${user.twitter}&`; }
  if (user.tumblr) { body += `tumblr=${user.tumblr}&`; }
  if (user.instagram) { body += `instagram=${user.instagram}&`; }

  return body;
}

export const actions = {
  removeAvatar,
  removeBackground,

  saveUsername,
  saveAlias,
  saveStatus
}
