import React from 'react';
import s from './WantToRegister.scss';

class WantToRegister extends React.Component {
  constructor () {
    super();
    this.state = {
      step: 1
    }
  }
  openSignupBox () {
    this.setState({step: this.state.step + 1})
    setTimeout(() => {
      this.signupInput.focus();
    }, 300);
    console.log(this.signupInput);
  }
  render () {
    return (
      <div>
        <div style={{display: this.state.step === 1 ? 'block' : 'none'}}>
          <div className={s.WantToRegister} onClick={this.openSignupBox.bind(this)}>Тоже хочу узнать мнения о себе!</div>
        </div>
        <div className={s.container} style={{display: this.state.step === 2 ? 'block' : 'none'}}>
          <div className={s.formTitle}>Введите адрес электронной почты.</div>
          <div className='form-control'>
            <input className='input input--form' style={{paddingLeft: '120px'}} ref={(r) => this.signupInput = r}/>
            <div className=''></div>
          </div>
        </div>
      </div>
    )
  }
}

export default WantToRegister;
