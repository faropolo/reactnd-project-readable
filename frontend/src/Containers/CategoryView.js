import React, { Component, Fragment } from "react";
import PostList from "../Components/PostList";
import { Row, Col, FormGroup, Button } from "reactstrap";
import { connect } from "react-redux";
import { loadPosts } from "../Actions";

class CategoryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.match.params["category"]
    };
  }

  componentDidMount() {
    this.props.loadCategoryPosts(this.state.category);
  }

  render() {
    let { categoryPosts } = this.props;
    let { category } = this.state;

    return (
      <Fragment>
        <Row className="justify-content-center">
          <Col xs="auto">Posts da categoria {category}</Col>
        </Row>
        <Row>
          <Col>
            {categoryPosts && (
              <PostList posts={categoryPosts} {...this.props} />
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup className="text-center">
              <Button
                className="form-btn"
                color="secondary"
                onClick={() => this.props.history.goBack()}
              >
                Voltar
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    categoryPosts: state.posts.categoryPosts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadCategoryPosts: category => dispatch(loadPosts(category))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryView);
