import { handleActions } from 'redux-actions';
import { config } from '../config.js';

const LOAD_FRIENDS = 'LOAD_FRIENDS';
export const loadFriends = () => {
  return (dispatch, getState) => {
    fetch(`${config.http}/api/users/friends`)
      .then((r) => r.json())
      .then((res) => {
        dispatch(LOAD_FRIENDS(res));
      });
  }
}

export const actions = {
  loadFriends
}
export default handleActions({
  [LOAD_FRIENDS]: (state, { payload }) => {
    return [...payload];
  }
}, []);
