import React, { Component } from 'react';
import './app.less';
import fbApp from '../firebase';

import Navigation from './navigation';
import PostList from './post-list';

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
      if(user) { this.setState({user: user}); }
      else { this.setState({user: undefined}); }
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
        <PostList />
      </div>
    );
  }
}

export default App;
