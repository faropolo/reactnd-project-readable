import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { loadPosts } from "../Actions";
import { Row, Col, Button } from "reactstrap";
import PostList from "../Components/PostList";
import CategoryList from "../Components/CategoryList";
import { Link } from "react-router-dom";

class HomeView extends Component {
  componentDidMount() {
    this.props.loadPosts();
  }
  render() {
    let { posts } = this.props;

    return (
      <Fragment>
        <Row className="justify-content-center">
          <Col className="text-center">
            <CategoryList />
          </Col>
        </Row>
        <Row>
          <Col>{posts && <PostList posts={posts} {...this.props} />}</Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs="auto">
            <Link to="/post/create">
              <Button color="primary">Adicionar</Button>
            </Link>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts.allPosts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadPosts: params => dispatch(loadPosts(params))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeView);
