import React, { Component } from "react";
import AppRoutes from "./Routes";
import { Container, Row, Col } from "reactstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-regular-svg-icons";

library.add(faThumbsUp, faThumbsDown);

class App extends Component {
  render() {
    return (
      <Container fluid={true}>
        <Row className="justify-content-center">
          <Col xs="auto">Readable Project</Col>
        </Row>
        <AppRoutes {...this.props} />
      </Container>
    );
  }
}

export default App;
