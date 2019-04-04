import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { updatePostAPI, loadCategories } from "../Actions";

class EditPostModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCommentModal: false,
      post: props.post
    };
  }

  onChangeField = event => {
    let field = event.currentTarget.name;
    let fieldValue = event.currentTarget.value;

    this.setState(state => {
      return {
        ...state,
        post: {
          ...state.post,
          [field]: fieldValue
        }
      };
    });
  };

  savePost() {
    let post = this.state.post;
    this.props.savePost(post);

    this.setState(state => {
      return {
        ...state,
        openCommentModal: false
      };
    });
  }

  toggleCommentModal() {
    this.setState({
      openCommentModal: !this.state.openCommentModal
    });
  }

  render() {
    let { openCommentModal } = this.state;

    return (
      <Fragment>
        <Button color="primary" onClick={() => this.toggleCommentModal()}>
          Editar Post
        </Button>

        <Modal isOpen={openCommentModal}>
          <ModalHeader> Editar </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="txtTitle">Titulo</Label>
                <Input
                  type="text"
                  name="title"
                  id="txtTitle"
                  value={this.state.post.title}
                  onChange={e => this.onChangeField(e)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="txtBody">Mensagem</Label>
                <Input
                  type="textarea"
                  id="txtBody"
                  name="body"
                  value={this.state.post.body}
                  onChange={e => this.onChangeField(e)}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => this.savePost()}>Salvar</Button>
            <Button onClick={() => this.toggleCommentModal()}>Cancel</Button>
          </ModalFooter>
        </Modal>
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
    savePost: post => dispatch(updatePostAPI(post)),
    loadCategories: () => dispatch(loadCategories())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPostModal);
