import { createAction, handleActions } from 'redux-actions';

export const LOAD_POSTS = 'LOAD_POSTS';

export const loadPosts = createAction(LOAD_POSTS, (value = 1) => value);

export default handleActions({
  [LOAD_POSTS]: (state, { payload }) => {
    return state;
  }
}, []);
