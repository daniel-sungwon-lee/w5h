import React, { Component } from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Auth from './auth';
import decodeToken from './decode-token';
import Home from './home';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
  }

  componentDidMount() {
    const token = window.localStorage.getItem('userToken');
    const user = token
      ? decodeToken(token)
      : null;
    this.setState({ user });
  }

  handleLogin(result) {
    const { user, token } = result;

    this.setState({ user })
    window.localStorage.setItem('userToken', token);
    window.location.pathname= "/"
  }

  handleSignOut() {
    window.localStorage.removeItem('userToken')
    this.setState({ user: null })
  }

  render() {
    if (this.state.user === null) {
      <Redirect to="/auth" />
    }

    return (
      <Switch>

        <Route path="/auth">
          <Auth handleLogin={this.handleLogin} />
        </Route>

        <Route exact={true} path="/">
          <Home handleSignOut={this.handleSignOut} />
        </Route>

      </Switch>
    );
  }
}
