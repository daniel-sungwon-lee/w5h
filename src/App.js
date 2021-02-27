import './App.css';
import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import Auth from './auth';

export default function App() {
  return (
    <Switch>

      <Route exact path="/auth">
        <Auth className="App" />
      </Route>

    </Switch>
  );
}
