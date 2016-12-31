import React, { Component } from 'react';
import './app.less';
import fbApp from '../firebase';

import Navigation from './navigation';
import PostList from './post-list';
import PostComposer from './post-composer';

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
    return (
      <div className="app">
        <Navigation title={this.state.title} user={this.state.user} />
        <div className="main">
          <PostComposer />
          <PostList />
        </div>
      </div>
    );
  }
}

export default App;
