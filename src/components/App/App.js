import React, { Component, PropTypes } from 'react';

import {Provider, connect} from 'react-redux';
import {createStore} from 'redux';

import emptyFunction from 'fbjs/lib/emptyFunction';
import s from './App.scss';
import Header from '../Header'
import Footer from '../Footer'



function reducer(state, action){
  switch(action.type){
    case 'INCREMENT':
      return {...state, ...{count: state.count + 1}};
    default:
      return state;
  }
}

var store = createStore(reducer, {
  count: 0
});

store.subscribe( ()=> {
  console.log(store.getState());
});

store.dispatch({type: 'INCREMENT'});

class App extends Component {

  static propTypes = {
    context: PropTypes.shape({
      insertCss: PropTypes.func,
      onSetTitle: PropTypes.func,
      onSetMeta: PropTypes.func,
      onPageNotFound: PropTypes.func,
    }),
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
  };

  static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
    onSetTitle: PropTypes.func.isRequired,
    onSetMeta: PropTypes.func.isRequired,
    onPageNotFound: PropTypes.func.isRequired,
  };

  getChildContext() {
    const context = this.props.context;
    return {
      insertCss: context.insertCss || emptyFunction,
      onSetTitle: context.onSetTitle || emptyFunction,
      onSetMeta: context.onSetMeta || emptyFunction,
      onPageNotFound: context.onPageNotFound || emptyFunction,
    };
  }

  componentWillMount() {
    this.removeCss = this.props.context.insertCss(s);
  }

  componentWillUnmount() {
    this.removeCss();
  }

  render() {
    var backround = this.props.background
      ? {
        background: `url(${config.http}/upload/background/${this.props.background})`,
        transition: 'all 0.2s'
      }
      : {}
    return !this.props.error ? (
        <div>
          <Provider store={store}>
            <div className='responsive_crop_fixed' style={backround}></div>
            <Header />
            {this.props.children}
          </Provider>
        </div>
    ) : this.props.children;
  }
}

function mapStateToProps(state){
  return {
    count: state.count,
    background: state.user.background
  }
}

function mapDispatchToProps(dispatch){
  return {
    increment: () => dispatch({type: 'INCREMENT'})
  }
}

export default connect(mapStateToProps)(App);
