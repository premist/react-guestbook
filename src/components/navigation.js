import React, { Component } from 'react';
import firebase from "firebase";
import fire from '../fire';

import './navigation.less';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    let provider = new firebase.auth.TwitterAuthProvider();
    fire.auth().signInWithPopup(provider);
  }

  logout() {
    fire.auth().signOut();
  }

  render() {
    let loginState = null;
    if (this.props.user === undefined) {
      loginState = (
        <p className="login-state">
          Not logged in. <a onClick={this.login}>Log in</a>
        </p>
      );
    } else {
      loginState = (
        <p className="login-state">
          Logged in. <a onClick={this.logout}>Log out</a>
        </p>
      );
    }

    return (
      <header className="navigation">
        <div className="container">
          <div className="row">
            <div className="col-5 colspan-4">
              <a className="title" href="#">{ this.props.title }</a>
            </div>

            <div className="col-5">{ loginState }</div>
          </div>
        </div>
      </header>
    );
  }
}

export default Navigation;
