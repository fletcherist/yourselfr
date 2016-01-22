/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import classNames from 'classnames';

import s from './Header.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import Navigation from '../Navigation';

@withStyles(s)


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Navbar';
    }
    render() {
        return(
            <header className={s.root} role="navigation">
                <div className={s.container}>
                    <div className={s.brand}>
                      <Link to='../'>
                           <img src={require('./logo.png')} width="65"/>
                      </Link>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;




