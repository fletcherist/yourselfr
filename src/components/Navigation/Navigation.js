/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Navigation.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(s)

class Navigation extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
          active: false
        }
    }
    toggle () {
      this.setState({
          active: !this.state.active
        })
    }
    render () {
      var menu = s.menu;
      var menuClass = cx({
          menu: s.menu,
          'hidden': !this.state.active
        })
      return (
            <div className="navbar-collapse collapse">
                <div className="nav navbar-nav navbar-right">
                    <li><a href="../alias">Ваня</a></li>
                    <li onClick={this.toggle.bind(this)}>
                        <i className="icon icon-menu menu-open"></i>
                    </li>

                    <div className={s.menu}>
                        <li>
                            <a>
                                <span>поделиться ссылкой</span>
                            </a>
                        </li>
                        <li>
                            <Link to="../preferences">
                                <i className="icon icon-wrench"></i>
                                <span>настройки</span>
                            </Link>
                        </li>
                        <li>
                            <a>
                                <div>
                                    <img src='css/img/icons/logout.svg' width='17x' style={{marginTop: '-8px'}}/>
                                </div>
                                <span>выйти</span>
                            </a>
                        </li>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navigation;
