import React from 'react';
import s from './Posts.scss';
import Post from '../Post';
import cx from 'classnames';
import {ending} from '../tools';

class Posts extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            count: this.props.count,
            alias: this.props.alias,
            posts: this.props.posts
        }
    }
    componentDidMount(){
    }

    componentWillMount(){
    }
    render() {
        var postsPronounce = ending(this.props.count, ['мнение', 'мнения', 'мнений']);
        var posts = this.state.posts;
        var postsArray;
        if(posts) {
            postsArray = posts.map(function(post){
                return(
                    <Post
                        key={post.text}
                        created_at={post.created_at}
                        text={post.text}
                        id={post._id}
                        likes={post.likes}
                    >
                    </Post>
                )
            });
        }

        return(
            <div>
                <div className={s.container_posts} id="right">
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
  alias: React.PropTypes.string.isRequired
}
Posts.defaultProps = {
  count: 0
}

export default Posts
