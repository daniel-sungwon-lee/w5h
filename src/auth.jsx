import './styles.css';
import React, { Component } from 'react';
import { TextField, IconButton, CircularProgress, Fade } from '@material-ui/core';
import { ExitToAppRounded, PersonAddRounded, ArrowBackRounded } from '@material-ui/icons'

export default class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      path: 'login',
      email: '',
      password: '',
      error: false,
      helperText: '',
      loading: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSwitch = this.handleSwitch.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
  }

  componentDidMount() {
    this.setState({ loading: false })
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
        error: false,
        helperText: ''
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
    this.setState({ loading: true })
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
            error: true,
            helperText: result.error,
            loading: false
          })
        }

        if (result.token && result.user) {
          this.props.handleLogin(result)
        }
      })
      .catch(() => window.location.reload())
  }

  handleSignUp(event){
    this.setState({ loading:true })
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
    if (this.state.loading) {
      return (
        <div className="spinner">
          <CircularProgress className="spinner-icon" />
        </div>
      )
    }

    if (this.state.path === 'login') {
      return (
        <div className="container d-flex flex-wrap justify-content-center" style={{paddingBottom: "7rem"}}>
          <Fade in timeout={500}>
            <div className="w-100 text-center m-5">
              <img className="logo" width="250" src="/images/w5h.png" alt="W5H logo" />
            </div>
          </Fade>
          <Fade in timeout={1000}>
            <div className="w-100 mx-5 mb-4">
              <h2>Hello, Job Seekers</h2>
              <h2>Sign in to get started</h2>
            </div>
          </Fade>
          <Fade in timeout={1500}>
            <div className="w-100 p-5 text-center form-div">
              <form onSubmit = {this.handleLogin} className="d-flex flex-column">
                <div className="d-flex flex-column align-items-center">

                  <TextField InputLabelProps={{required:false}} onChange={this.handleChange}
                  id ="email" label="Email" required type="email" error={this.state.error}
                  value={this.state.email} className="mt-4" />

                  <TextField InputLabelProps={{ required: false }} onChange={this.handleChange}
                  inputProps={{ minLength:8 }} id="password" label="Password" type="password"
                  required value={this.state.password} error={this.state.error}
                  helperText={this.state.helperText} className="mt-4" />

                </div>
                <div className="text-center mt-4">
                  <IconButton style={{color: "black"}} type="submit">
                    <ExitToAppRounded fontSize="large" />
                  </IconButton>
                </div>
              </form>
            </div>
          </Fade>
          <Fade in timeout={2000}>
            <div>
              <IconButton className="mt-4" onClick={this.handleSwitch}>
                <PersonAddRounded style={{color: "black"}} fontSize="large" />
              </IconButton>
            </div>
          </Fade>
        </div>
      )

    } else {
      return (
        <div className="container d-flex flex-wrap justify-content-center" style={{ paddingBottom: "7rem" }}>
          <Fade in timeout={500}>
            <div className="w-100 text-center m-5">
              <img className="logo" width="250" src="/images/w5h.png" alt="W5H logo" />
            </div>
          </Fade>
          <Fade in timeout={1000}>
            <div className="w-100 mx-5 mb-4">
              <h2>Sign up</h2>
              <h2 className="invisible">hehe</h2>
            </div>
          </Fade>
          <Fade in timeout={1500}>
            <div className="w-100 p-5 text-center form-div">
              <form onSubmit={this.handleSignUp} className="d-flex flex-column">
                <div className="d-flex flex-column align-items-center">

                  <TextField InputLabelProps={{ required: false }} onChange={this.handleChange}
                  id="email" label="Email" required type="email" value={this.state.email}
                  className="mt-4" />

                  <TextField InputLabelProps={{ required: false }} onChange={this.handleChange}
                  inputProps={{minLength:8}} id="password" label="Password" type="password"
                  required value={this.state.password} className="mt-4" />

                </div>
                <div className="text-center mt-4">
                  <IconButton style={{ color: "black" }} type="submit">
                    <PersonAddRounded fontSize="large" />
                  </IconButton>
                </div>
              </form>
            </div>
          </Fade>
          <Fade in timeout={2000}>
            <div>
              <IconButton className="mt-4" onClick={this.handleSwitch}>
                <ArrowBackRounded style={{ color: "black" }} fontSize="large" />
              </IconButton>
            </div>
          </Fade>
        </div>
      )
    }
  }

}
