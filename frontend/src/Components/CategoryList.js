import React, { Component } from "react";
import { Card, CardBody, CardHeader, Button } from "reactstrap";
import { connect } from "react-redux";
import { loadCategories } from "../Actions";
import { Link } from "react-router-dom";

class CategoryList extends Component {
  componentDidMount() {
    this.props.loadCategories();
  }
  render() {
    let { categories } = this.props;

    return (
      <Card>
        <CardHeader className="text-center">Categorias</CardHeader>
        <CardBody>
          {categories &&
            categories.allCategories.map(item => {
              return (
                <Link key={item.path} to={`/${item.path}`}>
                  <Button outline color="secondary" className="category-btn">
                    {item.name}
                  </Button>
                </Link>
              );
            })}
        </CardBody>
      </Card>
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
    loadCategories: () => dispatch(loadCategories())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryList);
