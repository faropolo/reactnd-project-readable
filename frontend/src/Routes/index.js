import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import HomeView from "../Containers/HomeView";
import CategoryView from "../Containers/CategoryView";
import PostDetailView from "../Containers/PostDetailView";
import CreatePost from "../Containers/CreatePostView";

const AppRoutes = props => {
  return (
    <Switch>
      <Route path="/" exact={true} component={HomeView} {...props} />
      <Route
        path="/post/create"
        exact={true}
        component={CreatePost}
        {...props}
      />
      <Route
        path="/:category"
        exact={true}
        component={CategoryView}
        {...props}
      />
      <Route
        path="/:category/:postId"
        exact={true}
        component={PostDetailView}
        {...props}
      />
    </Switch>
  );
};

export default withRouter(AppRoutes);
