import { createAction, handleActions } from 'redux-actions';
import { config } from '../config.js';
import { fetchFeed } from './isFetching';
import fetch from 'isomorphic-fetch';

const LOAD_ENDLESS_FEED = 'LOAD_ENDLESS_FEED';
const LOAD_FEED = 'LOAD_FEED';
const CLEAR_FEED = 'CLEAR_FEED';
const clearFeed = createAction(CLEAR_FEED);

const loadEndlessFeedPatch = createAction(LOAD_ENDLESS_FEED);
export const loadEndlessFeed = (offset) => {
  return (dispatch, getState) => {
    var url = `${config.http}/api/posts/endless`
    if (offset) {
      url += `/${offset}`
    }
    dispatch(clearFeed());
    dispatch(fetchFeed(true));
    console.log(url);
    fetch(url)
      .then((r) => r.json())
      .then((posts) => {
        console.log(posts);
        dispatch(loadEndlessFeedPatch(posts));
        dispatch(fetchFeed(false));
      })
  }
};

const loadFeedPatch = createAction(LOAD_FEED);
export const loadFeed = (offset) => {
  return (dispatch, getState) => {
    console.log('function was called');
    var url = `${config.http}/api/posts/feed`
    if (offset) {
      url += `/${offset}`
    }
    dispatch(clearFeed());
    dispatch(fetchFeed(true));
    fetch(url, {credentials: 'include'})
      .then((r) => r.json())
      .then((posts) => {
        console.log(posts);
        dispatch(loadFeedPatch(posts));
        dispatch(fetchFeed(false));
      })
  }
}

export const actions = {
  loadFeed,
  loadEndlessFeed
}

export default handleActions({
  [LOAD_ENDLESS_FEED]: (state, { payload }) => {
    return payload;
  },
  [LOAD_FEED]: (state, { payload }) => {
    return payload;
  },
  [CLEAR_FEED]: (state, { payload }) => {
    return [];
  }
}, []);
