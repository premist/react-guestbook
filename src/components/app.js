import React, { Component } from 'react';
import fire from '../fire';

import Navigation from './navigation';
import PostList from './post-list';
import PostComposer from './post-composer';

import './app.less';

class App extends Component {
  db = fire.database();
  state = {
    title: "React Playground",
    user: undefined
  };

  constructor(props) {
    super(props);

    let auth = fire.auth();

    this.setUser = this.setUser.bind(this);

    auth.onAuthStateChanged((user) => {
      if(user) { this.setUser(user); }
      else { this.setState({user: undefined}); }
    });
  }

  setUser(user) {
    this.setState({user: user});
    fire.database().ref(`users/${user.uid}`).set({
      avatar: user.photoURL.replace("http", "https"),
      displayName: user.displayName
    });
  }

  render() {
    return (
      <div className="app">
        <Navigation title={this.state.title} user={this.state.user} />
        <div className="main">
          <PostComposer user={this.state.user} />
          <PostList />
        </div>
      </div>
    );
  }
}

export default App;
