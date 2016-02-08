import React from 'react';
import s from './Posts.scss';
import Post from '../Post';
import { ending, isEmpty } from '../toools';
import {connect} from 'react-redux';
import { actions as postsActions } from '../../redux/modules/posts';

class Posts extends React.Component {
    componentDidMount () {
      console.log(this.props);
    }
    componentWillMount () {
      this.props.loadPosts();
      this.setState({
        count: this.props.count,
        postsLoaded: 10
      });
    }
    render () {
      var postsPronounce = ending(this.props.count, ['мнение', 'мнения', 'мнений']);
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
            />
          )
        });
      }

      return (
            <div>
                <div className={s.container_posts} id='right'>
                    <div className={s.header}>
                        <div className={s.counter}>
                            {this.props.count} {postsPronounce}
                        </div>
                    </div>
                    {postsArray}
                    {this.props.count > 10 &&  this.props.count > this.state.postsLoaded && (
                      <div
                            className={s.loadMore}
                            onClick={ () => {
                              this.props.loadMorePosts(this.state.postsLoaded)
                              this.setState({
                                postsLoaded: this.state.postsLoaded + 10
                              })
                            }}
                            >Загрузить ещё
                      </div>
                    )}
                </div>
            </div>
        )
    }
}

Posts.propTypes = {
  count: React.PropTypes.number.isRequired,
  posts: React.PropTypes.array.isRequired,
  loadPosts: React.PropTypes.func.isRequired,
  loadMorePosts: React.PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    posts: state.posts,
    count: state.user.stats.posts
  }
}
export default connect(mapStateToProps, postsActions)(Posts)
