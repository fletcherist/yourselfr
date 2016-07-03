import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import EndlessFeed from '../EndlessFeed';
<<<<<<< HEAD
import User from 'routes/User/containers/User';
=======
import User from '../User';
>>>>>>> origin/master
import FeedHeader from '../Headers/FeedHeader';
import NoFeed from '../NoData/NoFeed';

class Feed extends Component {
  static propTypes = {
    feed: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
  };

  render () {
    return (
      <User>
        <div className='container--right padding-0'>
          <FeedHeader alias={this.props.user.alias} username={this.props.user.username} />
          {this.props.feed.length > 0 && (
<<<<<<< HEAD
            <EndlessFeed feed={this.props.feed} isFetching={this.props.isFetching} />
          )}
          {this.props.feed.length === 0 && (
            <NoFeed />
=======
            <EndlessFeed feed={this.props.feed} isFetching={this.props.isFetching}/>
          )}
          {this.props.feed.length === 0 && (
            <NoFeed/>
>>>>>>> origin/master
          )}
        </div>
      </User>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    feed: state.feed,
    isFetching: state.isFetching.feed
  }
}

export default connect(mapStateToProps)(Feed);
