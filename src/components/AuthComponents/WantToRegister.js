import React from 'react';
import SignupForm from './Signup/SignupForm.js';
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
          <SignupForm />
        </div>
      </div>
    )
  }
}

export default WantToRegister;
