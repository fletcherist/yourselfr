import React from 'react';
import cx from 'classnames';
import s from './Navigation.scss';
import Link from 'react-router';

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
            <div className='navbar-collapse collapse'>
                <div className='nav navbar-nav navbar-right'>
                    <li><a href='../alias'>Ваня</a></li>
                    <li onClick={this.toggle.bind(this)}>
                        <i className='icon icon-menu menu-open'></i>
                    </li>

                    <div className={s.menu}>
                        <li>
                            <a>
                                <span>поделиться ссылкой</span>
                            </a>
                        </li>
                        <li>
                            <Link to='../preferences'>
                                <i className='icon icon-wrench'></i>
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
