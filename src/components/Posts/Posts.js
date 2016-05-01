import React, { Component, PropTypes } from 'react';
import s from './Posts.scss';
import Post from '../Post';
import { isEmpty, arraysEqual } from '../toools';
import {connect} from 'react-redux';
import { actions as postsActions } from '../../redux/modules/posts';
import Loader from '../Loader';
import NoPosts from '../NoData/NoPosts';
import PostsHeader from '../Headers/PostsHeader';

class Posts extends Component {
    static propTypes = {
      count: PropTypes.number.isRequired,
      posts: PropTypes.array.isRequired,
      loadPosts: PropTypes.func.isRequired,
      endlessLoad: PropTypes.func.isRequired,
      loadMorePosts: PropTypes.func.isRequired,
      isFetching: PropTypes.bool.isRequired,
      isFetchingLoadMore: PropTypes.bool.isRequired,
      isAuthenticated: PropTypes.bool.isRequired,
      username: PropTypes.string.isRequired,
      isYourPage: PropTypes.bool.isRequired
    };

    componentWillMount () {
      this.setState({
        count: this.props.count,
        postsLoaded: 25
      });
    }

    componentWillUpdate (nextProps) {
      return !arraysEqual(this.props.posts, nextProps.posts);
    }

    componentDidMount () {
      // this.endlessFeed = setInterval(() => this.props.endlessLoad(), 15000);
    }
    componentWillUnmount () {
      // this.endlessFeed && clearInterval(this.endlessFeed);
      // this.endlessFeed = false;
    }
    render () {
      var self = this;
      var posts = this.props.posts;
      var postsArray;
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
        });
      }

      return (
        <div className='container--right padding-0 container--posts' id='right'>
          <PostsHeader count={this.props.count} username={this.props.username}/>
          {this.props.isFetching && (
            <Loader/>
          )}
          {!this.props.isFetching && (
            <div>
              {this.props.count === 0 && (<NoPosts isAuthenticated={this.props.isAuthenticated}/>)}
              {this.props.count > 0 && (postsArray)}
            </div>
          )}

          {this.props.count > 10 && this.props.count > this.state.postsLoaded && (
            <div className={s.loadMore}
                  onClick={ () => {
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

function mapStateToProps (state) {
  return {
    posts: state.posts,
    count: state.user.stats.posts,
    isAuthenticated: state.auth.authenticated,
    isYourPage: state.auth.isYourPage,
    isFetching: state.isFetching.posts,
    isFetchingLoadMore: state.isFetching.loadMorePosts,
    username: state.user.username
  }
}
export default connect(mapStateToProps, postsActions)(Posts)
