import './App.css';
import React, { Component } from 'react';
import {
  Switch,
  Route
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

  render() {
    return (
      <Switch>

        <Route exact path="/auth">
          <Auth className="App" handleLogin={this.handleLogin} />
        </Route>

        <Route exact path="/">
          <Home className="App" />
        </Route>

      </Switch>
    );
  }
}
