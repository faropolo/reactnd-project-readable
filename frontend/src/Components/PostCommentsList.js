import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Row,
  Col,
  Button
} from "reactstrap";
import { connect } from "react-redux";
import { voteComment, deleteComment } from "../Actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostCommentFormModal from "./PostCommentForm";

class PostCommentsView extends Component {
  render() {
    let { comments, voteComment, deleteComment } = this.props;
    return (
      <Card>
        <CardHeader className="text-center">Comentarios</CardHeader>
        <CardBody>
          {comments &&
            comments.map(comment => {
              return (
                <Card key={comment.id}>
                  <CardBody>
                    <Row>
                      <Col sm={2}>Comentario</Col>
                      <Col sm={6} className="border">
                        {comment.body}
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={2}>Autor</Col>
                      <Col sm={2} className="border">
                        {comment.author}
                      </Col>
                      <Col sm={2}>Score</Col>
                      <Col sm={2} className="border">
                        {comment.voteScore}
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <Button
                      outline
                      color="primary"
                      onClick={() => voteComment(comment, true)}
                    >
                      <FontAwesomeIcon icon={["far", "thumbs-up"]} />
                    </Button>
                    <Button outline onClick={() => voteComment(comment, false)}>
                      <FontAwesomeIcon icon={["far", "thumbs-down"]} />
                    </Button>
                    <Button onClick={() => deleteComment(comment)}>
                      Apagar
                    </Button>
                    <PostCommentFormModal comment={comment} />
                  </CardFooter>
                </Card>
              );
            })}
        </CardBody>
      </Card>
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
    voteComment: (comment, positive) =>
      dispatch(voteComment(comment, positive)),
    deleteComment: comment => dispatch(deleteComment(comment))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProsp
)(PostCommentsView);
