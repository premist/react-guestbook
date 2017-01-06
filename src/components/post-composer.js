import React, { Component } from 'react';
import fire from '../fire';

import './post-composer.less';

class PostComposer extends Component {
  state = {
    postContent: "",
    submitting: false
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(e) {
    this.setState({ postContent: e.target.value });
  }

  handleKeyDown(e) {
    if(e.keyCode === 13 && e.metaKey) {
      this.submit(null);
    }
  }

  submit(e) {
    if(e !== null) {
      e.preventDefault();
    }

    this.setState({ submitting: true });

    fire.database().ref('posts').push({
      content: this.state.postContent,
      createdAt: Date.now(),
      createdBy: this.props.user.uid
    }).then((ref) => {
      this.setState({ postContent: "" });
    }).catch((e) => {
      console.warn(e);
    }).then(() => {
      this.setState({ submitting: false });
      this.textarea.focus();
    });
  };

  get buttonClasses() {
    let defaultClasses = "btn btn-spinner red";
    return this.state.submitting ? `${defaultClasses} loading` : defaultClasses;
  }

  get isDisabled() {
    return this.state.submitting || this.props.user === undefined
  }

  get submitDisabled() {
    return this.isDisabled || this.state.postContent === "";
  }

  render() {
    return(
      <section className="post-composer">
        <div className="container">
          <div className="panel">
            <h4>Write your post</h4>
            <form onSubmit={this.submit}>
              <div className="form-group">
                <textarea id="postContent"
                  className="input"
                  ref={(t) => { this.textarea = t; }}
                  disabled={this.isDisabled}
                  value={this.state.postContent}
                  onKeyDown={this.handleKeyDown}
                  onChange={this.handleChange}
                  placeholder="Type your message..."
                  required></textarea>
              </div>

              <div className="form-group">
                <button attributeType="submit"
                  className={this.buttonClasses}
                  disabled={this.submitDisabled}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default PostComposer;
