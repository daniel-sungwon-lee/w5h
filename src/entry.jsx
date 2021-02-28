import React, { Component } from 'react';
import { TextField, CircularProgress, IconButton } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { AssignmentTurnedInRounded } from '@material-ui/icons';

import './styles.css'

export default class Entry extends Component {
  constructor(props) {
    super(props)
    this.state={
      loading: true,
      who: '',
      what: '',
      date: new Date(),
      where: '',
      why: '',
      how: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({
      loading: false
    })
  }

  handleChange(e) {
    const { id, value } = e.target

    this.setState({
      [id] : value
    })
  }

  handleDateChange(date) {
    this.setState({ date: date })
  }

  handleSubmit(e) {
    this.setState({ loading: true })
    e.preventDefault()
    const { who, what, date, where, why, how } = this.state
    const userId = this.props.user.userId

    const reqBody = { userId, who, what, date, where, why, how }

    fetch('/api/entry', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(reqBody)
    })
      .then(res => {
        window.location.pathname = "/"
      })
      .catch(() => window.location.reload());
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="spinner">
          <CircularProgress className="spinner-icon" />
        </div>
      )
    }

    return (
      <div className="container">
        <div className="mt-5 text-center">
          <h2>New Job Entry</h2>
        </div>
        <div className="my-5 form-div entry">
          <form className="p-5" onSubmit={this.handleSubmit}>
            <TextField
              id="who"
              label="Who"
              helperText="Ex: Google"
              fullWidth
              required
              margin="normal"
              InputLabelProps={{
                required: false
              }}
              variant="outlined"
              onChange={this.handleChange}
            />
            <TextField
              id="what"
              label="What"
              helperText="Ex: Software Engineer"
              fullWidth
              required
              margin="normal"
              InputLabelProps={{
                required: false
              }}
              variant="outlined"
              onChange={this.handleChange}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                id="when"
                fullWidth
                helperText="Date applied"
                margin="normal"
                autoOk
                variant="inline"
                inputVariant="outlined"
                label="When"
                format="MM/dd/yyyy"
                value={this.state.date}
                InputAdornmentProps={{ position: "start" }}
                onChange={date => this.handleDateChange(date)}
              />
            </MuiPickersUtilsProvider>
            <TextField
              id="where"
              label="Where"
              helperText="Ex: Irvine, CA"
              fullWidth
              required
              margin="normal"
              InputLabelProps={{
                required: false
              }}
              variant="outlined"
              onChange={this.handleChange}
            />
            <TextField
              id="why"
              label="Why"
              helperText="Ex: To get paid to code!"
              fullWidth
              required
              margin="normal"
              InputLabelProps={{
                required: false
              }}
              variant="outlined"
              onChange={this.handleChange}
            />
            <TextField
              id="how"
              label="How"
              helperText="Ex: Through Linkedin"
              fullWidth
              required
              margin="normal"
              InputLabelProps={{
                required: false
              }}
              variant="outlined"
              onChange={this.handleChange}
            />
            <div className="text-center">
              <IconButton style={{ color: "black" }} type="submit">
                <AssignmentTurnedInRounded style={{ fontSize: "3.5rem" }} />
              </IconButton>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
