import './App.css';
import React, { Component } from 'react';
import { TextField, IconButton } from '@material-ui/core';
import { ExitToAppRounded, PersonAddRounded, ArrowBackRounded } from '@material-ui/icons'

export default class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      path: 'login',
      email: '',
      password: '',
      error: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSwitch = this.handleSwitch.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
  }

  handleChange(event){
    const { id, value } = event.target

    this.setState({ [id]: value })
  }

  handleSwitch() {
    if (this.state.path === "login") {
      this.setState({
        path: 'signUp',
        email: '',
        password: '',
        error: false
      })

    } else {
      this.setState({
        path: 'login',
        email: '',
        password: ''
      })
    }
  }

  handleLogin(event){
    event.preventDefault()

    const { email, password } = this.state
    const reqBody = { email, password }

    fetch('/api/login', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqBody)
    })
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          this.setState({
            error: true
          })
        }

        if (result.token && result.user) {
          this.props.handleLogin(result)
        }
      })
      .catch(() => window.location.reload())
  }

  handleSignUp(event){
    event.preventDefault()

    const { email, password } = this.state
    const reqBody = { email, password }

    fetch('/api/signUp', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqBody)
    })
      .then(res => res.json())
      .then(result => {
        this.setState({path: 'login'})
      })
      .catch(() => window.location.reload())
  }

  render() {
    if (this.state.path === 'login') {
      return (
        <div className="container d-flex flex-wrap justify-content-center" style={{paddingBottom: "7rem"}}>
          <div className="w-100 text-center m-5">
            <img className="logo" width="250" src="/images/w5h.png" alt="W5H logo" />
          </div>
          <div className="w-100 mx-5 mb-4">
            <h2 className="auth-header">Hello, Job Seekers</h2>
            <h2 className="auth-header">Sign in to get started</h2>
          </div>
          <div className="w-100 p-5 text-center form-div">
            <form onSubmit = {this.handleLogin} className="d-flex flex-column">
              <div className="d-flex flex-column align-items-center">

                <TextField InputLabelProps={{required:false}} onChange={this.handleChange}
                 id ="email" label="Email" required type="email" error={this.state.error}
                 value={this.state.email} />

                <TextField InputLabelProps={{ required: false }} onChange={this.handleChange}
                 inputProps={{ minLength:8 }} id="password" label="Password" type="password"
                 required value={this.state.password} error={this.state.error} />

              </div>
              <div className="text-center mt-4">
                <IconButton style={{color: "black"}} type="submit">
                  <ExitToAppRounded fontSize="large" />
                </IconButton>
              </div>
            </form>
          </div>
          <div>
            <IconButton className="mt-4" onClick={this.handleSwitch}>
              <PersonAddRounded style={{color: "black"}} fontSize="large" />
            </IconButton>
          </div>
        </div>
      )

    } else {
      return (
        <div className="container d-flex flex-wrap justify-content-center" style={{ paddingBottom: "7rem" }}>
          <div className="w-100 text-center m-5">
            <img className="logo" width="250" src="/images/w5h.png" alt="W5H logo" />
          </div>
          <div className="w-100 mx-5 mb-4">
            <h2 className="auth-header">Sign up</h2>
            <h2 className="invisible auth-header">hehe</h2>
          </div>
          <div className="w-100 p-5 text-center form-div">
            <form onSubmit={this.handleSignUp} className="d-flex flex-column">
              <div className="d-flex flex-column align-items-center">

                <TextField InputLabelProps={{ required: false }} onChange={this.handleChange}
                 id="email" label="Email" required type="email" value={this.state.email} />

                <TextField InputLabelProps={{ required: false }} onChange={this.handleChange}
                 inputProps={{minLength:8}} id="password" label="Password" type="password"
                 required value={this.state.password} />

              </div>
              <div className="text-center mt-4">
                <IconButton style={{ color: "black" }} type="submit">
                  <PersonAddRounded fontSize="large" />
                </IconButton>
              </div>
            </form>
          </div>
          <div>
            <IconButton className="mt-4" onClick={this.handleSwitch}>
              <ArrowBackRounded style={{ color: "black" }} fontSize="large" />
            </IconButton>
          </div>
        </div>
      )
    }
  }

}
