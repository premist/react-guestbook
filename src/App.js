import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import fbApp from './firebase';

class App extends Component {
  db = fbApp.database();
  state = { user: undefined };

  constructor(props) {
    super(props);

    let auth = fbApp.auth();

    auth.onAuthStateChanged((user) => {
      if(user) { this.setState({user: user}); console.log(user); }
      else { this.setState({user: undefined});  }
    });

    this.yoloswag = this.yoloswag.bind(this);
  }

  yoloswag() {
    console.log(this.db);
    console.log("yoloswag~~");
  }

  render() {
    let loggedInStateMessage = null;
    if(this.state.user === undefined) {
      loggedInStateMessage = <span>You are not logged in!!</span>;
    } else {
      loggedInStateMessage = <span>You are logged in!!</span>;
    }

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React!!!!</h2>
          <a onClick={this.yoloswag} className="btn">Click me!!1 </a>

        </div>
        <p className="App-intro">
          {loggedInStateMessage}<br />
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
