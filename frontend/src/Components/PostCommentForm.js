import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { createComment, updateCommentAPI } from "../Actions";

import {
  FormGroup,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button
} from "reactstrap";

class PostCommentFormModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openCommentModal: props.openCommentModal,
      comment: {
        author: "",
        body: "",
        parentId: "",
        ...props.comment
      }
    };
  }

  componentWillReceiveProps(props) {
    this.setState(state => {
      return {
        ...state,
        comment: {
          author: "",
          body: "",
          parentId: "",
          ...props.comment
        }
      };
    });
  }

  openCommentModal() {
    this.setState({ openCommentModal: true });
  }

  toggleCommentModal() {
    this.setState({
      openCommentModal: !this.state.openCommentModal
    });
  }

  saveComment() {
    let comment = {
      ...this.state.comment,
      timestamp: Date.now()
    };

    if (!comment.id) {
      this.props.addComment(comment);
    } else {
      this.props.updateComment(comment);
    }

    this.setState(state => {
      return {
        ...state,
        openCommentModal: !state.openCommentModal
      };
    });
  }

  onChangeField = event => {
    let field = event.currentTarget.name;
    let fieldValue = event.currentTarget.value;

    this.setState(state => {
      return {
        ...state,
        comment: {
          ...this.state.comment,
          [field]: fieldValue
        }
      };
    });
  };

  render() {
    let { openCommentModal } = this.state;
    let { body, author } = this.state.comment;
    let btnText =
      this.props.comment && this.props.comment.id
        ? "Alterar Comentario"
        : "Adicionar Comentario";

    return (
      <Fragment>
        <Button color="primary" onClick={() => this.toggleCommentModal()}>
          {btnText}
        </Button>

        <Modal isOpen={openCommentModal}>
          <ModalHeader> {btnText} </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="commentAuthor">Autor</Label>
              <Input
                type="text"
                name="author"
                id="commentAuthor"
                value={author}
                onChange={e => this.onChangeField(e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="commentMsg">Mensagem</Label>
              <Input
                type="textarea"
                name="body"
                id="commentMsg"
                value={body}
                onChange={e => this.onChangeField(e)}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => this.saveComment()}>Salvar</Button>
            <Button onClick={() => this.toggleCommentModal()}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

function mapDispatchToProsp(dispatch) {
  return {
    addComment: comment => dispatch(createComment(comment)),
    updateComment: comment => dispatch(updateCommentAPI(comment))
  };
}

export default connect(
  null,
  mapDispatchToProsp
)(PostCommentFormModal);
