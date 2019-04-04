import uuid from "uuid";
import postAPI from "../Apis/Posts";

export const LOAD_CATEGORIES = "LOAD_CATEGORIES";
export const SAVE_CATEGORIES = "SAVE_CATEGORIES";
export const SAVE_CATEGORY_POSTS = "SAVE_CATEGORY_POSTS";
export const SAVE_POSTS = "SAVE_POSTS";
export const SAVE_VIEW_POST = "SAVE_VIEW_POSTS";
export const SAVE_COMMENTS = "SAVE_COMMENTS";
export const ADD_POST = "ADD_POST";
export const ADD_COMMENT = "ADD_COMMENT";
export const UPDATE_POST = "UPDATE_POST";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const DELETE_POST = "DELETE_POST";
export const DELETE_COMMENT = "DELETE_COMMENT";

export function saveCategories(categories) {
  return {
    type: SAVE_CATEGORIES,
    categories
  };
}

export function savePosts(posts) {
  return {
    type: SAVE_POSTS,
    posts
  };
}

export function saveComments(comments) {
  return {
    type: SAVE_COMMENTS,
    comments
  };
}

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  };
}

export function updateComment(comment) {
  return {
    type: UPDATE_COMMENT,
    comment
  };
}

export function saveCategoryPosts(posts) {
  return {
    type: SAVE_CATEGORY_POSTS,
    posts
  };
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post
  };
}

export function updatePost(post) {
  return {
    type: UPDATE_POST,
    post
  };
}

export function saveViewPost(post) {
  return {
    type: SAVE_VIEW_POST,
    post
  };
}

export function removePost(post) {
  return {
    type: DELETE_POST,
    post
  };
}
export function removeComment(comment) {
  return {
    type: DELETE_COMMENT,
    comment
  };
}

/**
 * ########################################
 * Network Events
 * ########################################
 */

/**
 * Categories
 */
export function loadCategories() {
  return function(dispatch) {
    return postAPI
      .listCategories()
      .then(items => dispatch(saveCategories(items.categories)));
  };
}

/**
 * Posts
 */

export function loadFullPost(postId) {
  return function(dispatch) {
    return postAPI
      .getFullPost(postId)
      .then(data => dispatch(saveViewPost(data)));
  };
}

export function loadPosts(category = null) {
  return function(dispatch) {
    return category
      ? postAPI
          .listCategoryPosts(category)
          .then(items => dispatch(saveCategoryPosts(items)))
      : postAPI.listPosts().then(items => {
          dispatch(savePosts(items));
        });
  };
}

export function createPost(post) {
  post.id = uuid.v4();

  return function(dispatch) {
    return postAPI
      .createPost(post)
      .then(
        postAdded => dispatch(addPost(postAdded)),
        error => console.log(error)
      );
  };
}

export function createComment(comment) {
  comment.id = uuid.v4();

  return function(dispatch) {
    return postAPI
      .createComment(comment)
      .then(
        commentAdded => dispatch(addComment(commentAdded)),
        error => console.log(error)
      );
  };
}

export function votePost(post, positive) {
  return function(dispatch) {
    return postAPI
      .votePost(post, positive)
      .then(post => dispatch(updatePost(post)), error => console.log(error));
  };
}

export function voteComment(comment, positive) {
  return function(dispatch) {
    return postAPI
      .voteComment(comment, positive)
      .then(
        comment => dispatch(updateComment(comment)),
        error => console.log(error)
      );
  };
}

export function deletePost(post) {
  return function(dispatch) {
    return postAPI.deletePost(post).then(data => dispatch(removePost(post)));
  };
}

export function deleteComment(comment) {
  return function(dispatch) {
    return postAPI
      .deleteComment(comment)
      .then(data => dispatch(removeComment(comment)));
  };
}

export function updatePostAPI(post) {
  return function(dispatch) {
    return postAPI.updatePost(post).then(data => dispatch(updatePost(post)));
  };
}

export function updateCommentAPI(comment) {
  return function(dispatch) {
    return postAPI
      .updateComment(comment)
      .then(data => dispatch(updateComment(comment)));
  };
}
