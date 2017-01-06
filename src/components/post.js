import React, { Component } from 'react';
import fire from '../fire';

import moment from 'moment';

import './post.less';

class Post extends Component {
  state = {};

  constructor(props) {
    super(props);

    // Get author information
    fire.database()
      .ref(`users/${this.props.post.createdBy}`)
      .once('value')
      .then((snapshot) => {
        this.updateAuthor(snapshot.val());
      });
  }

  get createdAt() {
    return this.props.post.createdAt;
  }

  updateAuthor(author) {
    this.setState({
      author: { avatar: author.avatar, displayName: author.displayName }
    });
  }

  render() {
    let authorInfo = null;
    if(this.state.author) {
      authorInfo = <img className="avatar" alt="avatar" src={this.state.author.avatar} />
    }

    return(
      <li className="post">
        <div>
          <p>{this.props.post.content}</p>

          <div className="meta">
            { authorInfo }
            <time dateTime={new Date(this.createdAt)}>
              {moment(this.createdAt).fromNow()}
            </time>
          </div>
        </div>
      </li>
    )
  }
}

export default Post;
