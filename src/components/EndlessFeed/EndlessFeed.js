import React, { Component, PropTypes } from 'react';
import { isEmpty } from '../toools';
import FeedPost from '../FeedPost';
import Loader from '../Loader';

class EndlessFeed extends Component {
  constructor (props) {
    super(props);
    this.state = {
      feed: []
    }
  }

  render () {
    var endlessFeed = this.props.feed;
    var endlessFeedArray;
    if (endlessFeed && !isEmpty(endlessFeed) && Array.isArray(endlessFeed)) {
      endlessFeedArray = endlessFeed.map(function (post) {
        return (
          <FeedPost
            user={post.user}
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
        {this.props.isFetching && (
          <Loader/>
        )}
        {endlessFeedArray}
      </div>
    )
  }
}

EndlessFeed.propTypes = {
  feed: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired
}
export default EndlessFeed;
