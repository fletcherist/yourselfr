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
    fetch(`${config.http}/api/preferences/change/vk`, {
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
      dispatch(fetchSocialNetworks({vk: {status: false}}));
    });
  }
}

export const actions = {
  updateVK
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
