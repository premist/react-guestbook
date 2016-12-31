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
    this.submit = this.submit.bind(this);
  }

  handleChange(e) {
    this.setState({ postContent: e.target.value });
  }

  submit(e) {
    e.preventDefault();

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
    });
  };

  get classForButton() {
    let defaultClasses = "btn btn-spinner red";
    return this.state.submitting ? `${defaultClasses} loading` : defaultClasses;
  }

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
                placeholder="Type your message..."
                required></textarea>
            </div>

            <div className="form-group">
              <button attributeType="submit"
                className={this.classForButton}>Submit</button>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default PostComposer;
