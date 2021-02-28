import './styles.css'
import React, { Component } from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import Auth from './auth';
import decodeToken from './decode-token';
import Home from './home';
import Entry from './entry';

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
    if (!this.state.user) {
      return <Auth handleLogin={this.handleLogin} />
    }

    return (
      <div className="App">
        <Switch>

          <Route exact path="/auth">
            <Auth handleLogin={this.handleLogin} />
          </Route>

          <Route exact path="/">
            <Home userId={this.state.user.userId} handleSignOut={this.handleSignOut} />
          </Route>

          <Route exact path="/entry">
            <Entry user={this.state.user} />
          </Route>

        </Switch>
      </div>
    );
  }
}
