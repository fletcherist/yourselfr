import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { actions as feed } from '../../redux/modules/endlessFeed';
import s from './Headers.scss';
let cx = classNames.bind(s);

class FeedHeader extends Component {
  static propTypes = {
    alias: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    loadEndlessFeed: PropTypes.func.isRequired,
    loadFeed: PropTypes.func.isRequired
  };
  constructor () {
    super();
    this.state = {
      selected: 1
    }
  }

  componentWillMount () {
    if (this.state.selected === 2) {
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
    if (this.state.selected === 1) this.props.loadEndlessFeed();
    else this.props.loadFeed();
  }

  render () {
    const { alias, username } = this.props;
    return (
      <div className={s.blockTitle}>
        <Link to={`/${alias}`} className={s.navLink}>{username}</Link>
        <span className={s.separator}></span>
        <span className={s.navItem}>Лента</span>
        <div className={s.pick}>
          <div className={cx({param: true, selected: this.state.selected === 1})} onClick={ () => this.changeSelector(1) }>личная</div>
          <div className={cx({param: true, selected: this.state.selected === 2})} onClick={ () => this.changeSelector(2) }>всеобщая</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
}
export default connect(mapStateToProps, feed)(FeedHeader);
