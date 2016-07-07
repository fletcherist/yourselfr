import { config } from '../config';
import { fetchSocialNetworks } from './isFetching';

import {
  changeVK,
  changeTumblr,
  changeTwitter,
  changeInstagram,
  changeFacebook
} from './auth';

var body = {
  method: 'POST',
  headers: {
    'Content-type': config.post
  },
  credentials: 'include',
  body: ''
}
export const updateVK = (vk) => {
  return (dispatch) => {
    dispatch(fetchSocialNetworks({vk: {status: true}}));
    dispatch(changeVK(vk));
    var params = body;
    params.body = `vk=${vk}`;
    fetch(`${config.http}/api/preferences/change/vk`, params)
    .then((r) => r.json())
    .then((res) => {
      console.log(res);
      dispatch(fetchSocialNetworks({vk: {status: false}}));
    });
  }
}

export const updateTwitter = (twitter) => {
  return (dispatch) => {
    dispatch(fetchSocialNetworks({twitter: {status: true}}));
    dispatch(changeTwitter(twitter));
    var params = body;
    params.body = `twitter=${twitter}`;
    fetch(`${config.http}/api/preferences/change/twitter`, params)
    .then((r) => r.json())
    .then((res) => {
      console.log(res);
      dispatch(fetchSocialNetworks({twitter: {status: false}}));
    });
  }
}

export const updateTumblr = (tumblr) => {
  return (dispatch) => {
    dispatch(fetchSocialNetworks({tumblr: {status: true}}));
    dispatch(changeTumblr(tumblr));
    var params = body;
    params.body = `tumblr=${tumblr}`;
    fetch(`${config.http}/api/preferences/change/tumblr`, params)
    .then((r) => r.json())
    .then((res) => {
      console.log(res);
      dispatch(fetchSocialNetworks({tumblr: {status: false}}));
    });
  }
}

export const updateInstagram = (instagram) => {
  return (dispatch) => {
    dispatch(fetchSocialNetworks({instagram: {status: true}}));
    dispatch(changeInstagram(instagram));
    var params = body;
    params.body = `instagram=${instagram}`;
    fetch(`${config.http}/api/preferences/change/instagram`, params)
    .then((r) => r.json())
    .then((res) => {
      console.log(res);
      dispatch(fetchSocialNetworks({instagram: {status: false}}));
    });
  }
}

export const updateFacebook = (facebook) => {
  return (dispatch) => {
    dispatch(fetchSocialNetworks({facebook: {status: true}}));
    dispatch(changeFacebook(facebook));
    var params = body;
    params.body = `facebook=${facebook}`;
    fetch(`${config.http}/api/preferences/change/facebook`, params)
    .then((r) => r.json())
    .then((res) => {
      console.log(res);
      dispatch(fetchSocialNetworks({facebook: {status: false}}));
    });
  }
}

export const actions = {
  updateVK,
  updateTwitter,
  updateTumblr,
  updateInstagram,
  updateFacebook
}
