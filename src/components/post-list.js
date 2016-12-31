import React, { Component } from 'react';
import fire from '../fire';

import './post-list.less';

class PostList extends Component {
  state = { posts: [] };
  postsRef = null;

  constructor(props) {
    super(props);

    this.postsRef = fire.database()
                        .ref('/posts');
  }

  componentDidMount() {
    this.postsRef
      .orderByChild('createdAt')
      .limitToLast(25)
      .once('value')
      .then((snapshot) => this.setState({ posts: snapshot.val() }));
  }

  render() {
    const posts = Object.keys(this.state.posts).reverse().map((k) => {
      return <li key={k}>{this.state.posts[k].content}</li>
    });

    return (
      <section className="post-list">
        <div className="container">
          <p>PostList</p>
          <ul>
            {posts}
          </ul>
        </div>
      </section>
    );
  }
}

export default PostList;
