import React, { Component, Fragment } from "react";
import { createPost, loadCategories } from "../Actions";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import PostForm from "../Components/PostForm";

class CreatePost extends Component {
  componentDidMount() {
    this.props.loadCategories();
  }

  savePost(post) {
    this.props.savePost(post);
    this.props.history.goBack();
  }

  cancel() {
    this.props.history.goBack();
  }

  render() {
    return (
      <Fragment>
        <Row className="justify-content-center">
          <Col xs="auto">
            <PostForm
              savePost={post => this.savePost(post)}
              goBack={() => this.cancel()}
            />
          </Col>
        </Row>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    savePost: post => dispatch(createPost(post)),
    loadCategories: () => dispatch(loadCategories())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePost);
