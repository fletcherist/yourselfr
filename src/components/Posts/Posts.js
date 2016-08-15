import React, { Component } from 'react'
import s from './Posts.scss'
import Post from '../Post'
import { isEmpty } from '../Toools'

import Loader from '../Loader'
import NoPosts from '../NoData/NoPosts'
// import PostsHeader from '../Headers/PostsHeader'
import WriteBox from '../WriteBox'

class Posts extends Component {
  componentWillMount () {
    this.setState({
      count: this.props.count,
      postsLoaded: 25,
      height: 200
    })
  }

  componentWillUpdate (nextProps) {
    if (this.props.posts[0] && nextProps.posts[0]) {
      return this.props.posts[0]._id !== nextProps.posts[0]._id
    }
    return false
  }

  render () {
    var self = this
    var posts = this.props.posts
    var postsArray
    if (posts && !isEmpty(posts) && Array.isArray(posts)) {
      postsArray = posts.map(function (post) {
        return (
          <Post
            key={post._id}
            created_at={post.created_at}
            text={post.text}
            id={post._id}
            likes={post.likes}
            attachments={post.attachments}
            comments={post.comments}
            isLiked={post.isLiked}
            isYourPage={self.props.isYourPage}
            removePost={self.props.removePost}
          />
        )
      })
    }
    return (
      <div className='container--right container--posts padding-0' id='right'>
        <WriteBox />
        {this.props.isFetching && (
          <Loader />
        )}
        {!this.props.isFetching && (
          <div>
            {this.props.count === 0 &&
              (<NoPosts isAuthenticated={this.props.isAuthenticated} />)}
            {this.props.count > 0 && (postsArray)}
          </div>
        )}

        {this.props.count > 10 && this.props.count > this.state.postsLoaded && (
          <div className={s.loadMore} onClick={() => {
            this.props.loadMorePosts(this.state.postsLoaded)
            this.setState({
              postsLoaded: this.state.postsLoaded + 10
            })
          }}>
            {this.props.isFetchingLoadMore && ('Загрузка...')}
            {!this.props.isFetchingLoadMore && ('Загрузить ещё')}
          </div>
        )}
      </div>
      )
  }
}

export default Posts
