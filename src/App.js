import './styles.css'
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './nav';
import Auth from './auth';
import decodeToken from './decode-token';
import Home from './home';
import Entry from './entry';
import Application from './application';
import { CircularProgress } from '@material-ui/core';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      appId: null,
      loading: true
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
    this.handleAppId = this.handleAppId.bind(this)
  }

  componentDidMount() {
    const token = window.localStorage.getItem('userToken');
    const user = token
      ? decodeToken(token)
      : null;
    this.setState({ user, loading: false });

    const currentPath = window.location.pathname
    const pathArr = currentPath.split("/")
    const [, , appId] = pathArr
    this.setState({ appId })
  }

  handleLogin(result) {
    const { user, token } = result;

    this.setState({ user })
    window.localStorage.setItem('userToken', token);

    if (window.localStorage.getItem('userToken')) {
      window.location.pathname= "/"
    }
  }

  handleSignOut() {
    window.localStorage.removeItem('userToken')
    this.setState({ user: null })
  }

  handleAppId(id) {
    this.setState({appId: id})
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="spinner">
          <CircularProgress className="spinner-icon" />
        </div>
      )
    }

    if (!this.state.user) {
      return <Auth handleLogin={this.handleLogin} />
    }

    return (
      <div className="App">
        <Router>
          <Nav handleSignOut={this.handleSignOut} handleAppId={this.handleAppId} />
          <Switch>

            <Route exact path="/auth">
              <Auth handleLogin={this.handleLogin} />
            </Route>

            <Route exact path="/">
              <Home userId={this.state.user.userId}
               handleAppId={this.handleAppId} />
            </Route>

            <Route path="/entry">
              <Entry user={this.state.user} appId={this.state.appId}
               handleAppId={this.handleAppId} />
            </Route>

            <Route exact path={`/application/${this.state.appId}`}>
              <Application userId={this.state.user.userId} appId={this.state.appId}
               handleAppId={this.handleAppId} />
            </Route>

          </Switch>
        </Router>
      </div>
    );
  }
}
