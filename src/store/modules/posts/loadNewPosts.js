import { createAction } from 'redux-actions'
import { config } from 'store/config'
import { LOAD_NEW_POSTS } from './constants'

const loadNewPostsPatch = createAction(LOAD_NEW_POSTS)
export const loadNewPosts = () => {
  return (dispatch, getState) => {
    var lastPostID = getState().posts[0]._id
    var alias = getState().user.alias
    fetch(`${config.http}/api/posts/new/${alias}/${lastPostID}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.posts) {
          dispatch(loadNewPostsPatch(res.posts))
        } else {
          console.log('new posts are not ready yet for patching')
        }
      })
  }
}

export default loadNewPosts
