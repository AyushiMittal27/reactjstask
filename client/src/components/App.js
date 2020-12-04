import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import { connect } from "react-redux";
import * as actions from "../actions";
import Login from "./Login";
import Profile from "./Profile";
import Index from "./Index";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className='container'>
        <BrowserRouter>
          <div className='container'>
            <Header />
            <Route exact path='/' component={Index} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/profile' component={Profile} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
