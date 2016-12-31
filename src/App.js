import React, { Component } from 'react';
import './App.less';
import fbApp from './firebase';

import Navigation from './components/navigation';

class App extends Component {
  db = fbApp.database();
  state = {
    title: "React Playground",
    user: undefined
  };

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
        <Navigation title={this.state.title} user={this.state.user} />
        <div className="App-header container">
          <h2>Welcome to React!!!!</h2>
        </div>
        <p className="App-intro container">
          {loggedInStateMessage}<br />
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
