import { createAction, handleActions } from 'redux-actions';
import {config} from '../config.js';
import { fetchEndlessFeed } from './isFetching';

export const LOAD_ENDLESS_FEED = 'LOAD_ENDLESS_FEED';

const loadEndlessFeedPatch = createAction(LOAD_ENDLESS_FEED);
export const loadEndlessFeed = (offset) => {
  return (dispatch, getState) => {
    var url = `${config.http}/api/posts/endless`
    if (offset) {
      url += `/${offset}`
    }
    dispatch(fetchEndlessFeed(true));
    console.log(url);
    fetch(url)
      .then((r) => r.json())
      .then((posts) => {
        dispatch(loadEndlessFeedPatch(posts));
        dispatch(fetchEndlessFeed(false));
      })
  }
};

export const actions = {
  loadEndlessFeed
}

export default handleActions({
  [LOAD_ENDLESS_FEED]: (state, { payload }) => {
    return [...payload];
  }
}, []);
