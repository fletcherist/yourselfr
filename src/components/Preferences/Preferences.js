import React from 'react';
import s from './Preferences.scss';

class Preferences extends React.Component {
    constructor (props) {
      super(props);

      this.state = {
        username: this.props.username,
        alias: this.props.alias
      }
    }

    handle (e) {
      console.log('sadasd');
      this.setState({
        alias: e.target.value
      });
    }

    render () {
        // var posts
      return (
            <div className={s.container}>
                <h3>имя</h3>

                <input placeholder='любимое моё' defaultValue={this.state.username}/>
                <h3>адрес страницы</h3>
                <small>поделитесь им с друзьями, чтобы они смогли найти вас</small>
                <input value={this.state.alias}/>
                <h3>о себе</h3>
                <div>
                    <textarea defaultValue={this.state.username}/>
                </div>
                <button>Сохранить</button>

                <h2>Аватар</h2>
                <button>Выбрать</button>
            </div>
        );
    }
}

Preferences.propTypes = {
  username: React.PropTypes.string.isRequired,
  alias: React.PropTypes.string.isRequired,
  about: React.PropTypes.string
};

export default Preferences;
