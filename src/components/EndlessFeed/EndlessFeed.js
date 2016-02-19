import React from 'react';
import s from './EndlessFeed.scss';
import { connect } from 'react-redux';
import { loadEndlessFeed } from '../../redux/modules/endlessFeed';
import { ending, isEmpty } from '../toools';
import Post from '../Post';
import Loader from '../Loader';

class EndlessFeed extends React.Component {
  constructor (props) {
    super(props);
    this.props.endlessFeed();
  }
  render () {
    var endlessFeed = this.props.feed;
    console.log(this.props.endlessFeed);
    var endlessFeedArray;
    if (endlessFeed && !isEmpty(endlessFeed) && Array.isArray(endlessFeed)) {
      endlessFeedArray = endlessFeed.map(function (post) {
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
        <h1>The feed is endless</h1>
        {this.props.isFetching && (
          <Loader/>
        )}
        {endlessFeedArray}
      </div>
    )
  }
}

EndlessFeed.propTypes = {
  feed: React.PropTypes.array.isRequired,
  isFetching: React.PropTypes.bool.isRequired
}
const mapDispatchToProps = (dispatch) => {
  return {
    endlessFeed: () => dispatch(loadEndlessFeed())
  }
}
const mapStateToProps = (state) => {
  return {
    feed: state.endlessFeed,
    isFetching: state.isFetching.endlessFeed
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EndlessFeed);
