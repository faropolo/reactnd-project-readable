import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id ? props.id : "",
      title: props.title ? props.title : "",
      body: props.body ? props.body : "",
      author: props.author ? props.author : "",
      category: props.category ? props.category : "",
      timestamp: props.timestamp ? props.timestamp : ""
    };
  }

  onChangeField = event => {
    let field = event.currentTarget.name;
    let fieldValue = event.currentTarget.value;

    this.setState(state => {
      return {
        ...state,
        [field]: fieldValue
      };
    });
  };

  savePost() {
    let post = {
      ...this.state
    };

    this.props.savePost(post);
  }

  render() {
    let { categories, isModal } = this.props;

    return (
      <Form>
        <FormGroup>
          <Label for="txtTitle">Titulo</Label>
          <Input
            type="text"
            name="title"
            id="txtTitle"
            value={this.state.title}
            onChange={e => this.onChangeField(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="txtBody">Mensagem</Label>
          <Input
            type="textarea"
            id="txtBody"
            name="body"
            value={this.state.body}
            onChange={e => this.onChangeField(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="txtAuthor">Author</Label>
          <Input
            type="text"
            id="txtAuthor"
            name="author"
            value={this.state.author}
            onChange={e => this.onChangeField(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="txtCategory">Categoria</Label>
          <Input
            type="select"
            name="category"
            id="txtCategory"
            value={this.state.category}
            onChange={e => this.onChangeField(e)}
          >
            <option value="">Escolha uma categoria</option>
            {categories &&
              categories.allCategories.map(item => {
                return (
                  <option value={item.path} key={item.path}>
                    {item.name}
                  </option>
                );
              })}
          </Input>
        </FormGroup>
        {!isModal && (
          <FormGroup className="text-center">
            <Button
              className="form-btn"
              color="primary"
              onClick={() => this.savePost()}
            >
              Salvar
            </Button>
            <Button
              className="form-btn"
              color="secondary"
              onClick={() => this.props.goBack()}
            >
              Cancelar
            </Button>
          </FormGroup>
        )}
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state
  };
}

export default connect(mapStateToProps)(PostForm);
