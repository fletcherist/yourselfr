/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import s from './Login.scss';
import withStyles from '../../decorators/withStyles';

const title = 'Вход';

@withStyles(s)
class Login extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  componentWillMount () {
    this.context.onSetTitle(title);
  }

  render () {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <p>...</p>
        </div>
      </div>
    );
  }

}

export default Login;
