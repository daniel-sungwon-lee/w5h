import './styles.css';
import React, { Component, useState } from 'react';
import { TextField, IconButton, CircularProgress, Fade, Dialog,
         DialogTitle, DialogContent, Tooltip } from '@material-ui/core';
import { ExitToAppRounded, PersonAddRounded, ArrowBackRounded,
         HelpRounded, VpnKeyRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

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
    this.handleKey = this.handleKey.bind(this)
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

  handleKey() {
    this.setState({
      email: "demo@Usr",
      password: "somethingHard"
    })
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
        <>
        <Fade in timeout={1500}>
          <HelpDialog />
        </Fade>
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
          <div className="d-flex mt-4 w-100 justify-content-center">
            <Fade in timeout={2000}>
              <div className="mx-2">
                <Tooltip arrow title="Sign up">
                  <IconButton onClick={this.handleSwitch}>
                    <PersonAddRounded style={{color: "black"}} fontSize="large" />
                  </IconButton>
                </Tooltip>
              </div>
            </Fade>
            <Fade in timeout={2500}>
              <div className="mx-2">
                <Tooltip arrow title="Demo login">
                  <IconButton onClick={this.handleKey}>
                    <VpnKeyRounded fontSize="large" className="text-dark" />
                  </IconButton>
                </Tooltip>
              </div>
            </Fade>
          </div>
        </div>
        </>
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

const useStyles = makeStyles({
  iconButton: {
    position: "absolute",
    top: "0.5rem",
    right: "0.5rem",
  },
  icon: {
    fontSize: "2.5rem",
    color: "black",
    opacity: "0.3"
  },
  paper: {
    padding: "2rem",
    borderRadius: "3rem",
    backgroundColor: "#D5F7C6"
  },
  content: {
    fontSize: "1.25rem"
  }
})

function HelpDialog (props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  return (
    <>
      <IconButton className={classes.iconButton} onClick={() => setOpen(true)}>
        <HelpRounded className={classes.icon} />
      </IconButton>
      <Dialog classes={{paper: classes.paper}} onClose={() => setOpen(false)} open={open}>
        <DialogTitle>
          <h2>What does this app do?</h2>
        </DialogTitle>
        <DialogContent className={classes.content}>
          <p>
            Job searching is definitely not much fun, not to mention the time and
            effort it takes just to keep track of all your job applications and
            remember what companies you applied to.
          </p>
          <p>
            Thats where W5H comes in handy; W5H&mdash;which stands for Who, What,
            When, Where, Why, How&mdash;helps job seekers keep track of their job
            applications. Yes, you could use Excel or Sheets, but whats the fun in that?
          </p>
        </DialogContent>
      </Dialog>
    </>
  )
}
