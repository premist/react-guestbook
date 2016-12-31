import React, { Component } from 'react';
import './navigation.less';

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let greeting = null;
    if(this.props.user === undefined) {
      greeting = <span>Not logged in</span>;
    } else {
      greeting = <span>Logged in</span>;
    }

    return (
      <div className="navigation">
        <p>Hi I am a navigation</p>
        <p className="greeting">{ greeting }</p>
      </div>
    );
  }
}

export default Navigation;
