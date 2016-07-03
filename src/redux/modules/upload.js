import { config } from '../config';
import {
         fetchAvatar,
         fetchBackground
} from './isFetching';

import { patchAvatar, patchBackground } from './user';

export const loadAvatar = (avatar) => {
  return (dispatch, getState) => {
    console.log('saving uploading avatar..');
    dispatch(fetchAvatar({status: true, state: false}));
    fetch(`${config.http}/upload/avatar`, {
      method: 'post',
      credentials: 'include',
      body: avatar
    })
    .then((r) => r.json())
    .then((res) => {
      dispatch(fetchAvatar({status: false, state: true}));
      dispatch(patchAvatar(res.src));
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
    dispatch(fetchBackground({status: true, state: false}));
    fetch(`${config.http}/upload/background`, {
      method: 'post',
      credentials: 'include',
      body: background
    })
    .then((r) => r.json())
    .then((res) => {
      dispatch(fetchBackground({status: false, state: true}));
      dispatch(patchBackground(res.src));
      console.log(res);
    })
    .catch((e) => {
      console.log('Error catched while attaching a photo', e);
    })
  }
}

export const actions = {
  loadAvatar,
  loadBackground
}
