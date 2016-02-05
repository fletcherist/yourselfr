import React from 'react';
import s from './Posts.scss';
import Post from '../Post';
import {ending} from '../toools';
import {connect} from 'react-redux';
import { actions as postsActions } from '../../redux/modules/posts';

class Posts extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        count: this.props.count
      }
    }
    componentDidMount () {
      // setInterval(() => { this.props.loadPosts() }, 1000);
    }

    componentWillMount () {
      this.props.loadPosts();
    }
    render () {
      var postsPronounce = ending(this.props.count, ['мнение', 'мнения', 'мнений']);
      var posts = this.props.posts;
      var postsArray;
      if (posts) {
        postsArray = posts.map(function (post) {
          return (
            <Post
              key={post._id}
              created_at={post.created_at}
              text={post.text}
              id={post._id}
              likes={post.likes}
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
                </div>
            </div>
        )
    }
}

Posts.propTypes = {
  count: React.PropTypes.number,
  posts: React.PropTypes.array,
  loadPosts: React.PropTypes.func.isRequired
}
Posts.defaultProps = {
  count: 0
}

function mapStateToProps (state) {
  return {
    posts: state.posts,
    count: state.user.stats.posts
  }
}
export default connect(mapStateToProps, postsActions)(Posts)
