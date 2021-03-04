import React, { Component } from 'react';
import { CircularProgress, Paper, Tooltip, IconButton, Grow, Card } from '@material-ui/core'
import { ArrowBackRounded } from '@material-ui/icons';
import { Link } from 'react-router-dom';

import './styles.css'

export default class Application extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      data: []
    }
    this.data = {
      id: this.props.appId
    }
  }

  componentDidMount() {
    fetch(`/api/application/${this.props.userId}/${this.data.id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          data: data,
          loading: false
        })
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
        {
          this.state.data.map(app => {
            const { applicationId, who, what, when, where, why, how, status } = app
            const dateArr = when.split("T")
            const [date] = dateArr

            return (
              <Grow in key={applicationId}>
                <Paper key={applicationId} elevation={5} style={{ background: "#D5F7C6", borderRadius: "3rem"}}>
                  <div className="application-form-header d-flex justify-content-between align-items-center">
                    <IconButton className="invisible">
                      <ArrowBackRounded style={{ fontSize: "3.5rem", color: "black" }} />
                    </IconButton>
                    <Tooltip arrow title="Who">
                      <h2 className="h2 m-0 fit-content">{`Application for ${who}`}</h2>
                    </Tooltip>
                    <Link to="/" className="text-decoration-none"
                      onClick={() => this.props.handleAppId(null)}>
                      <IconButton>
                        <ArrowBackRounded style={{ fontSize: "3.5rem", color: "black" }} />
                      </IconButton>
                    </Link>
                  </div>
                  <div className="text-left pb-5 mb-5">
                    <div className="px-5 py-3">
                      <Tooltip arrow title="What" placement="right">
                        <h3 className="fit-content">Position Title</h3>
                      </Tooltip>
                      <Card className="h5 p-4">
                        {what}
                      </Card>
                    </div>
                    <div className="px-5 py-3">
                      <Tooltip arrow title="When" placement="right">
                        <h3 className="fit-content">Date applied</h3>
                      </Tooltip>
                      <Card className="h5 p-4">
                        {date}
                      </Card>
                    </div>
                    <div className="px-5 py-3">
                      <Tooltip arrow title="Where" placement="right">
                        <h3 className="fit-content">Job Location</h3>
                      </Tooltip>
                      <Card className="h5 p-4">
                        {where}
                      </Card>
                    </div>
                    <div className="px-5 py-3">
                      <Tooltip arrow title="Why" placement="right">
                        <h3 className="fit-content">Reason for Applying</h3>
                      </Tooltip>
                      <Card className="h5 p-4">
                        {why}
                      </Card>
                    </div>
                    <div className="px-5 py-3">
                      <Tooltip arrow title="How" placement="right">
                        <h3 className="fit-content">Method of Application</h3>
                      </Tooltip>
                      <Card className="h5 p-4">
                        {how}
                      </Card>
                    </div>
                    <div className="px-5 pt-3 pb-5">
                      <Tooltip arrow title="Status" placement="right">
                        <h3 className="fit-content">Application status</h3>
                      </Tooltip>
                      <Card className="h5 p-4">
                        {status}
                      </Card>
                    </div>
                  </div>
                </Paper>
              </Grow>
            )
          })
        }
      </div>
    )
  }
}
