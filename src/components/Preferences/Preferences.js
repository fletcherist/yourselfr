import React from 'react';
import s from './Preferences.scss';
import { connect } from 'react-redux';
import {actions as meActions} from '../../redux/modules/me';

class Preferences extends React.Component {
    render () {
        // var posts
      return (
            <div className='container--right'>
                <h3>имя</h3>

                <input
                  placeholder='любимое моё'
                  defaultValue={this.props.username}
                  className={s.username}
                />
                <h3>адрес страницы</h3>
                <small>поделитесь им с друзьями, чтобы они смогли найти вас</small>
                <input
                  defaultValue={this.props.alias}
                  className={s.alias}
                />
                <h3>о себе</h3>
                <div>
                    <textarea
                      defaultValue={this.props.username}
                      className={s.status}
                    />
                </div>
                <button className={s.savePreferences}
                        onClick={this.props.savePreferences}>
                        Сохранить
                </button>
            </div>
        );
    }
}

Preferences.propTypes = {
  username: React.PropTypes.string.isRequired,
  alias: React.PropTypes.string.isRequired,
  status: React.PropTypes.string,
  savePreferences: React.PropTypes.func.isRequired
};

function mapStateToProps (state) {
  return {
    username: state.me.username,
    alias: state.me.alias,
    status: state.me.status
  }
}

export default connect(mapStateToProps, meActions)(Preferences);
