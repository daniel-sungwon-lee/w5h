import React, { Component } from 'react';
import { CircularProgress, Paper } from '@material-ui/core'

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
            const { applicationId, who, what, when, where, why, how } = app
            const dateArr = when.split("T")
            const [date] = dateArr

            return (
              <Paper key={applicationId} elevation={5}>
                <div className="mt-5 p-5 text-center">
                  <h2 className="h2 m-0">{`Application for ${who}`}</h2>
                </div>
                <div className="text-left pb-5 mb-5">
                  <div className="px-5 py-3">
                    <h3>Position</h3>
                    <h5>{what}</h5>
                  </div>
                  <div className="px-5 py-3">
                    <h3>Date applied</h3>
                    <h5>{date}</h5>
                  </div>
                  <div className="px-5 py-3">
                    <h3>Location</h3>
                    <h5>{where}</h5>
                  </div>
                  <div className="px-5 py-3">
                    <h3>Reason</h3>
                    <h5>{why}</h5>
                  </div>
                  <div className="px-5 pt-3 pb-5">
                    <h3>Method of application</h3>
                    <h5>{how}</h5>
                  </div>
                </div>
              </Paper>
            )
          })
        }
      </div>
    )
  }
}
