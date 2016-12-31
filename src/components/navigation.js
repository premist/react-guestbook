import React, { Component } from 'react';
import './navigation.less';

class Navigation extends Component {
  render() {
    let greeting = null;
    if(this.props.user === undefined) {
      greeting = <span>Not logged in</span>;
    } else {
      greeting = <span>Logged in</span>;
    }

    return (
      <header className="navigation">
        <div className="container">
          <div className="row">
            <div className="col-5 colspan-4">
              <a className="title" href="#">{ this.props.title }</a>
            </div>

            <div className="col-5">
              <p className="greeting">{ greeting }</p>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Navigation;
