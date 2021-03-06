import React, { Component } from 'react';
import { TextField, CircularProgress, IconButton, Zoom, Grow, Popover, Button } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { AssignmentTurnedInRounded, BlockRounded } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

import './styles.css'

const customCalendarTheme = createMuiTheme({
  overrides: {
    MuiPaper: {
      rounded: {
        borderRadius: "1.5rem"
      },
    },
    MuiPickersCalendar: {
      transitionContainer: {
        marginBottom: "1rem"
      },
    },
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: "#1db954"
      },
    },
    MuiPickersDay: {
      daySelected: {
        backgroundColor: "#1db954 !important"
      },
      current: {
        color: "#1db954"
      }
    },
    MuiTypography: {
      colorPrimary: {
        color: "#1db954"
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: "#1db954"
      },
    },
  },
})

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
      how: '',
      status: 'Applied',
      appId: this.props.appId,
      type: 'New'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (this.state.appId) {
      fetch(`/api/application/${this.props.user.userId}/${this.state.appId}`)
        .then(res => res.json())
        .then(data => {
          const [obj] = data
          const { who, what, when, where, why, how, status } = obj

          this.setState({
            who,
            what,
            date: when,
            where,
            why,
            how,
            status,
            type: 'Edit',
            loading: false
          })
        })
        .catch(() => window.location.reload())

    } else {
      this.setState({
        loading: false
      })
    }
  }

  handleChange(e) {
    const { id, value } = e.target

    this.setState({
      [id] : value
    })
  }

  handleDateChange(date) {
    const strDate = date.toLocaleDateString()

    this.setState({ date: strDate })
  }

  handleSubmit(e) {
    this.setState({ loading: true })
    e.preventDefault()

    const { who, what, date, where, why, how, status, appId } = this.state
    const userId = this.props.user.userId

    if (this.state.appId) {
      const reqBody = { who, what, date, where, why, how, status }

      fetch(`/api/entry/${userId}/${appId}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(reqBody)
      })
        .then(res => {
          window.location.pathname = "/"
        })
        .catch(() => window.location.reload());

    } else {
      const reqBody = { userId, who, what, date, where, why, how, status, isChecked: false }

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
        <Zoom in>
          <div className="d-flex justify-content-between align-items-center form-header">
            <IconButton className="invisible">
              <BlockRounded style={{ fontSize: "3.5rem"}} />
            </IconButton>
            <h2 className="m-0 h2">{this.state.type} Job Entry</h2>
            <PopupState variant="popover" popupId="cancel">
              {
                popupState => (
                  <>
                    <IconButton {...bindTrigger(popupState)}>
                      <BlockRounded color="secondary" style={{ fontSize: "3.5rem" }} />
                    </IconButton>
                    <Popover {...bindPopover(popupState)} PaperProps={{
                       style: {
                         borderRadius: "3rem"
                       }
                     }}
                     anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                     transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                      <Link to="/" className="text-decoration-none"
                      onClick={() => this.props.handleAppId(null)}>
                        <Button variant="contained" color="secondary">
                          Cancel?
                        </Button>
                      </Link>
                    </Popover>
                  </>
                )
              }
            </PopupState>

          </div>
        </Zoom>
        <Grow in>
          <div className="mb-5 mt-4 form-div entry">
            <form className="p-5" onSubmit={this.handleSubmit}>
              <TextField
                id="who"
                label="Who"
                helperText="Company Name"
                fullWidth
                required
                value={this.state.who}
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
                helperText="Position Title"
                fullWidth
                required
                value={this.state.what}
                margin="normal"
                InputLabelProps={{
                  required: false
                }}
                variant="outlined"
                onChange={this.handleChange}
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <ThemeProvider theme={customCalendarTheme}>
                  <KeyboardDatePicker
                    id="when"
                    fullWidth
                    helperText="Date Applied"
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
                </ThemeProvider>
              </MuiPickersUtilsProvider>
              <TextField
                id="where"
                label="Where"
                helperText="Job Location"
                fullWidth
                required
                value={this.state.where}
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
                helperText="Reason for Applying"
                fullWidth
                required
                value={this.state.why}
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
                helperText="Method of Application"
                fullWidth
                required
                value={this.state.how}
                margin="normal"
                InputLabelProps={{
                  required: false
                }}
                variant="outlined"
                onChange={this.handleChange}
              />
              <TextField
                id="status"
                label="Status"
                helperText="Current Status of Job Application"
                fullWidth
                required
                value={this.state.status}
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
        </Grow>
      </div>
    )
  }
}
