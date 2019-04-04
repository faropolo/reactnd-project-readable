import React, { Component } from "react";
import {
  Table,
  Button,
  Card,
  CardHeader,
  CardBody,
  Input,
  Label,
  Form,
  FormGroup
} from "reactstrap";
import { connect } from "react-redux";
import { deletePost, votePost } from "../Actions";
import sortBy from "sort-by";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditPostModal from "./EditPostModal";

class PostList extends Component {
  state = {
    order: "voteScore",
    reverse: false
  };

  deletePost(post) {
    this.props.deletePost(post);
  }

  votePost(post, positive) {
    this.props.votePost(post, positive);
  }

  changeOrder(event) {
    let order = event.currentTarget.value;

    this.setState({ order });
  }

  changeOrderDirection(event) {
    let reverse = event.currentTarget.value === "true" ? true : false;
    this.setState({ reverse });
  }

  viewPost(post) {
    this.props.history.push(`${post.category}/${post.id}`);
  }

  render() {
    let { posts } = this.props;
    let { order, reverse } = this.state;

    order = reverse ? `-${order}` : order;
    posts.sort(sortBy(order));

    return (
      <Card>
        <CardHeader className="text-center"> Posts </CardHeader>
        <CardBody>
          <Form inline className="postListOrder">
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="orderSelect" className="mr-sm-2">
                Ordenar Por
              </Label>
              <Input
                type="select"
                name="order"
                id="orderSelect"
                value={this.state.order}
                onChange={event => this.changeOrder(event)}
              >
                <option value="voteScore">Score</option>
                <option value="title">Titulo</option>
                <option value="author">Autor</option>
                <option value="category">Categoria</option>
                <option value="timestamp">Data</option>
              </Input>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input
                type="select"
                name="orderDirection"
                id="orderDirectionSelect"
                value={this.state.reverse}
                onChange={event => this.changeOrderDirection(event)}
              >
                <option value={false}>Ascendente</option>
                <option value={true}>Descendente</option>
              </Input>
            </FormGroup>
          </Form>
          <Table responsive>
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Autor</th>
                <th>Categoria</th>
                <th>Score</th>
                <th>Comentarios</th>
                <th>Data</th>
                <th>Votar</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {posts &&
                posts.map(post => {
                  return (
                    <tr key={post.id}>
                      <td>{post.title}</td>
                      <td>{post.author}</td>
                      <td>{post.category}</td>
                      <td>{post.voteScore}</td>
                      <td>{post.commentCount}</td>
                      <td>
                        {new Intl.DateTimeFormat("pt-BR", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit"
                        }).format(post.timestamp)}
                      </td>
                      <td>
                        <Button
                          outline
                          color="primary"
                          onClick={e => {
                            e.preventDefault();
                            this.votePost(post, true);
                          }}
                        >
                          <FontAwesomeIcon icon={["far", "thumbs-up"]} />
                        </Button>
                        <Button
                          outline
                          onClick={e => {
                            e.preventDefault();
                            this.votePost(post, false);
                          }}
                        >
                          <FontAwesomeIcon icon={["far", "thumbs-down"]} />
                        </Button>
                      </td>
                      <td>
                        <Button onClick={() => this.deletePost(post)}>
                          Apagar
                        </Button>
                        <Button onClick={() => this.viewPost(post)}>
                          Visualizar Post
                        </Button>
                        <EditPostModal post={post} />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    );
  }
}

function mapDispatchtoProps(dispatch) {
  return {
    deletePost: post => dispatch(deletePost(post)),
    votePost: (post, positive) => dispatch(votePost(post, positive))
  };
}

export default connect(
  null,
  mapDispatchtoProps
)(PostList);
