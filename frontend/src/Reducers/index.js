import { combineReducers } from "redux";
import {
  SAVE_CATEGORIES,
  SAVE_POSTS,
  SAVE_VIEW_POST,
  SAVE_CATEGORY_POSTS,
  SAVE_COMMENTS,
  ADD_POST,
  ADD_COMMENT,
  UPDATE_POST,
  UPDATE_COMMENT,
  DELETE_POST,
  DELETE_COMMENT
} from "../Actions";

const initialCategoryState = { allCategories: [] };
const initialPostsState = { allPosts: [], categoryPosts: [] };

function categories(state = initialCategoryState, action) {
  const { categories } = action;

  switch (action.type) {
    case SAVE_CATEGORIES:
      return {
        allCategories: categories
      };
    default:
      return state;
  }
}

function posts(state = initialPostsState, action) {
  const { posts, post, comments, comment } = action;

  switch (action.type) {
    case SAVE_POSTS:
      return {
        ...state,
        allPosts: posts
      };
    case SAVE_CATEGORY_POSTS:
      return {
        ...state,
        categoryPosts: posts
      };
    case SAVE_VIEW_POST:
      return {
        ...state,
        viewPost: post
      };
    case SAVE_COMMENTS:
      return {
        ...state,
        viewPost: {
          ...state.viewPost,
          comments
        }
      };
    case ADD_COMMENT:
      return {
        ...state,
        viewPost: {
          ...state.viewPost,
          commentCount: state.viewPost.commentCount + 1,
          comments: [...state.viewPost.comments, comment]
        }
      };
    case ADD_POST:
      return {
        ...state,
        allPosts: [...state.allPosts, post]
      };
    case UPDATE_POST:
      return {
        ...state,
        allPosts: state.allPosts.map(statePost => {
          return statePost.id === post.id ? post : statePost;
        }),
        categoryPosts: state.categoryPosts.map(statePost => {
          return statePost.id === post.id ? post : statePost;
        })
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        viewPost: {
          ...state.viewPost,
          comments: state.viewPost.comments.map(stateComment => {
            return stateComment.id === comment.id ? comment : stateComment;
          })
        }
      };
    case DELETE_POST:
      return {
        ...state,
        allPosts: state.allPosts.filter(statePost => statePost.id !== post.id)
      };
    case DELETE_COMMENT:
      return {
        ...state,
        viewPost: {
          ...state.viewPost,
          commentCount: state.viewPost.commentCount - 1,
          comments: state.viewPost.comments.filter(
            stateComment => stateComment.id !== comment.id
          )
        }
      };
    default:
      return state;
  }
}

export default combineReducers({ categories, posts });
