import { config } from '../config';
import { fetchSocialNetworks } from './isFetching';

import {
  changeVK,
  changeTumblr,
  changeTwitter,
  changeInstagram
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

export const actions = {
  updateVK,
  updateTwitter,
  updateTumblr,
  updateInstagram
}
// export const saveSocialNetworks = (networks) => {
//   return (dispatch, getState) => {
//     console.log(networks);
//     dispatchFetch(true);
//
//     updateData();
//     var body = createBody(networks);
//     console.log(body);
//     fetch(`${config.http}/api/users`, {
//       method: 'POST',
//       headers: {
//         'Content-type': config.post
//       },
//       credentials: 'include',
//       body: body
//     })
//     .then((r) => r.json())
//     .then((res) => {
//       console.log(res);
//       dispatchFetch(false);
//     });
//
//     function dispatchFetch (status) {
//       if (networks.vk) {
//         dispatch(fetchSocialNetworks({vk: {status: status}}));
//       } else if (networks.twitter) {
//         dispatch(fetchSocialNetworks({twitter: {status: status}}));
//       } else if (networks.tumblr) {
//         dispatch(fetchSocialNetworks({tumblr: {status: status}}));
//       } else if (networks.instagram) {
//         dispatch(fetchSocialNetworks({instagram: {status: status}}));
//       }
//     }
//
//     function updateData () {
//       if (networks.vk) {
//         dispatch(changeVK(networks.vk));
//       } else if (networks.twitter) {
//         dispatch(changeTwitter(networks.twitter));
//       } else if (networks.tumblr) {
//         dispatch(changeTumblr(networks.tumblr));
//       } else if (networks.instagram) {
//         dispatch(changeInstagram(networks.instagram));
//       }
//     }
//   }
// }
