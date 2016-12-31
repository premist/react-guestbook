import React, { Component } from 'react';
import './App.less';
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
          <h2>Welcome to React!!!!</h2>
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
