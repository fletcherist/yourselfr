import React from 'react';
import { connect } from 'react-redux';
import EndlessFeed from '../EndlessFeed';
import Navigation from '../Navigation';
import s from './Feed.scss';
import classNames from 'classnames/bind';
import { actions as feed } from '../../redux/modules/endlessFeed';
let cx = classNames.bind(s);

class Feed extends React.Component {
  constructor () {
    super();
    this.state = {
      selected: 1
    }
  }
  componentWillMount () {
    if (this.state.selected === 1) {
      this.props.loadEndlessFeed();
    } else {
      this.props.loadFeed();
    }
  }
  changeSelector (selector) {
    if (selector === this.state.selected) return false;
    this.setState({
      selected: selector
    })
  }
  render () {
    return (
      <div>
        <Navigation />
        <div className={s.container}>
          <div className={s.pick}>
            <div className={cx({param: true, selected: this.state.selected === 1})} onClick={ () => this.changeSelector(1) }>Моя личная</div>
            <div className={cx({param: true, selected: this.state.selected === 2})} onClick={ () => this.changeSelector(2) }>Всеобщая</div>
          </div>
          <EndlessFeed feed={this.props.feed}/>
        </div>
      </div>
    )
  }
}

Feed.propTypes = {
  loadEndlessFeed: React.PropTypes.func.isRequired,
  loadFeed: React.PropTypes.func.isRequired,
  feed: React.PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  return {
    feed: state.feed
  }
}

export default connect(mapStateToProps, feed)(Feed);
