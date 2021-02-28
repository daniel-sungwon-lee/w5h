import React, { Component } from 'react';

export default class Application extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    let path = window.location.pathname
    let pathArr = path.split("/")
    let [, , applicationId] = pathArr
  }

  render() {
    return (
      <div className="container">
        <div className="mt-5 text-center">
          <h2>{}</h2>
        </div>
      </div>
    )
  }
}
