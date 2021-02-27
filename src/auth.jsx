import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';

const form = {
  background: "#D5F7C6",
  borderRadius: "3rem",
  margin: "0 3rem"
}

export default class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      path: 'login',
      email: '',
      password: ''
    }
    this.handleSwitch = this.handleSwitch.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleSwitch() {
    this.setState({path: 'signUp'})
  }

  handleLogin(){
    const { email, password } = this.state
    const reqBody = { email, password }

    fetch('/api/login', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqBody)
    })
      .then(res => res.json())
      .then(result => {

      })
  }

  render() {
    if (this.state.path === 'login') {
      return (
        <div className="container d-flex flex-wrap justify-content-center">
          <div className="w-100 text-center">
            <img width="250" src="/images/w5h.png" alt="W5H logo" />
          </div>
          <div className="w-100 p-5 text-center" style={form}>
            <form onSubmit = {this.handleLogin} className="d-flex flex-column">
              <div className="d-flex flex-column align-items-center">
                <TextField id ="email" label="Email" required type="email" />
                <TextField id="password" label="Password" type="password" required />
              </div>
              <div className="text-center mt-4">
                <IconButton style={{color: "black"}} type="submit">
                  <ExitToAppRoundedIcon fontSize="large" />
                </IconButton>
              </div>
            </form>
          </div>
          <div>
            <IconButton className="mt-4" onClick={this.handleSwitch}>
              <PersonAddRoundedIcon style={{color: "black"}} fontSize="large" />
            </IconButton>
          </div>
        </div>
      )

    } else {
      return (
        <div>
          <img src="wh5.png" alt="W5H logo" />
        </div>
      )
    }
  }

}
