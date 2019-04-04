import React, { Component, Fragment } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Input,
  Label,
  Button
} from "reactstrap";
import { connect } from "react-redux";
import { loadFullPost } from "../Actions";
import PostCommentsList from "../Components/PostCommentsList";
import PostCommentFormModal from "../Components/PostCommentForm";
import { Link } from "react-router-dom";

class PostDetailView extends Component {
  state = {
    openCommentModal: false
  };

  componentDidMount() {
    let postId = this.props.match.params["postId"];
    this.props.loadPost(postId);
  }

  render() {
    let { viewPost } = this.props;

    return (
      <Fragment>
        <Row>
          <Col>
            <Card>
              <CardHeader className="text-center">Post</CardHeader>
              <CardBody>
                {viewPost && (
                  <Form>
                    <FormGroup row>
                      <Label for="idField" className="col-sm-2 col-form-label">
                        ID
                      </Label>
                      <Col sm={10}>
                        <Input
                          id="idField"
                          readOnly
                          plaintext
                          value={viewPost.id}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        for="titleField"
                        className="col-sm-2 col-form-label"
                      >
                        Titulo
                      </Label>
                      <Col sm={10}>
                        <Input
                          type="text"
                          id="titleField"
                          readOnly
                          plaintext
                          value={viewPost.title}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        for="bodyField"
                        className="col-sm-2 col-form-label"
                      >
                        Mensagem
                      </Label>
                      <Col sm={10}>
                        <Input
                          type="textarea"
                          id="bodyField"
                          readOnly
                          plaintext
                          value={viewPost.body}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        for="authorField"
                        className="col-sm-2 col-form-label"
                      >
                        Author
                      </Label>
                      <Col sm={10}>
                        <Input
                          id="authorField"
                          readOnly
                          plaintext
                          value={viewPost.author}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        for="authorField"
                        className="col-sm-2 col-form-label"
                      >
                        Comentarios
                      </Label>
                      <Col sm={10}>
                        <Input
                          id="authorField"
                          readOnly
                          plaintext
                          value={viewPost.commentCount}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        for="scoreField"
                        className="col-sm-2 col-form-label"
                      >
                        Score
                      </Label>
                      <Col sm={10}>
                        <Input
                          id="scoreField"
                          readOnly
                          plaintext
                          value={viewPost.voteScore}
                        />
                      </Col>
                    </FormGroup>
                    <Col className="text-center">
                      <PostCommentFormModal
                        comment={{ parentId: viewPost.id }}
                      />
                      <Link to="/">
                        <Button>Home</Button>
                      </Link>
                    </Col>
                    <PostCommentsList comments={viewPost.comments} />
                  </Form>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    viewPost: state.posts.viewPost
  };
}

function mapDispatchToProsp(dispatch) {
  return {
    loadPost: postId => dispatch(loadFullPost(postId))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProsp
)(PostDetailView);
