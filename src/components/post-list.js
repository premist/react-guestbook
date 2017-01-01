import React, { Component } from 'react';
import fire from '../fire';

import Post from './post';

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
    this.loadInitialPosts();
    this.listenForPosts();
  }

  loadInitialPosts() {
    this.postsRef
      .orderByChild('createdAt')
      .limitToLast(25)
      .once('value')
      .then((snapshot) => {
        let posts = [];

        snapshot.forEach((child) => {
          posts.unshift([child.key, child.val()]);
        });

        this.setState({ posts: posts });
      });
  }

  listenForPosts() {
    this.postsRef.on('child_added', (child) => {
      this.setState({
        posts: [[child.key, child.val()], ...this.state.posts]
      });
    });
  }

  render() {
    const posts = this.state.posts.map((k) => {
      return <Post key={k[0]} post={k[1]} />
    });

    return (
      <section className="post-list">
        <div className="container">
          <div className="panel">
            <ul>
              {posts}
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

export default PostList;
