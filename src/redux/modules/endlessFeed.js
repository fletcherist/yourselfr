import { createAction, handleActions } from 'redux-actions';
import {config} from '../config.js';
import { fetchEndlessFeed, fetchFeed } from './isFetching';
import fetch from 'isomorphic-fetch';

export const LOAD_ENDLESS_FEED = 'LOAD_ENDLESS_FEED';
export const LOAD_FEED = 'LOAD_FEED';

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

const loadFeedPatch = createAction(LOAD_FEED);
export const loadFeed = (offset) => {
  return (dispatch, getState) => {
    console.log('function was called');
    var url = `${config.http}/api/posts/feed`
    if (offset) {
      url += `/${offset}`
    }
    dispatch(fetchFeed(true));
    fetch(url, {credentials: 'include'})
      .then((r) => r.json())
      .then((posts) => {
        console.log(posts);
        dispatch(loadFeedPatch(posts));
        dispatch(fetchEndlessFeed(false));
      })
  }
}

export const actions = {
  loadFeed,
  loadEndlessFeed
}

export default handleActions({
  [LOAD_ENDLESS_FEED]: (state, { payload }) => {
    return [...payload];
  },
  [LOAD_FEED]: (state, { payload }) => {
    return [...payload];
  }
}, []);
