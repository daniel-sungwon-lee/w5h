import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core'

import './styles.css'

export default class Application extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      data: []
    }
  }

  componentDidMount() {
    const path = window.location.pathname
    const pathArr = path.split("/")
    const [, , applicationId] = pathArr

    fetch(`/api/application/${this.props.userId}/${applicationId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          data: data,
          loading: false
        })

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

    return (
      <div className="container">
        <div className="mt-5 text-center">
          <h2>{}</h2>
        </div>
      </div>
    )
  }
}
