import React from 'react';
// import cx from 'classnames';
import s from './Navigation.scss';
import { Link } from 'react-router';

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
      return (
            <div className={s.navigation}>
              <Link to='/' >
                <div className={s.yoButton} title='Вернуться на главную - Йорселфер'></div>
              </Link>
            </div>
        );
    }
}

export default Navigation;
