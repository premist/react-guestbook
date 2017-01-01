import React, { Component } from 'react';
import moment from 'moment';

import './post.less';

class Post extends Component {
  state = {};

  get createdAt() {
    return this.props.post.createdAt;
  }

  render() {
    return(
      <li className="post">
        <div>
          <p>{this.props.post.content}</p>
          <time dateTime={new Date(this.createdAt)}>
            {moment(this.createdAt).fromNow()}
          </time>
        </div>
      </li>
    )
  }
}

export default Post;
