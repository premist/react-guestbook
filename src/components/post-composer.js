import React, { Component } from 'react';
import fire from '../fire';

import './post-composer.less';

class PostComposer extends Component {
  state = { postContent: "" };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(e) {
    this.setState({ postContent: e.target.value });
  }

  submit(e) {
    e.preventDefault();
    console.log(this.state.postContent);
  };

  render() {
    return(
      <section className="post-composer">
        <div className="container">
          <form onSubmit={this.submit}>
            <div className="form-group">
              <label className="form-label" htmlFor="postContent">Your post</label>
              <textarea id="postContent"
                className="input"
                value={this.state.postContent}
                onChange={this.handleChange}
                placeholder="Type your message..."></textarea>
            </div>

            <div className="form-group">
              <button attributeType="submit" className="btn red">Submit</button>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default PostComposer;
