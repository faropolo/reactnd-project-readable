const requestParams = (method, body) => {
  return {
    method: method,
    headers: new Headers({
      Authorization: "aloha",
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(body)
  };
};

const host = "http://localhost:3001";

function createPost(post) {
  return fetch(`${host}/posts`, requestParams("POST", post)).then(
    data => data.json(),
    error => console.log(error)
  );
}

function createComment(comment) {
  return fetch(`${host}/comments`, requestParams("POST", comment)).then(
    data => data.json(),
    error => console.log(error)
  );
}

function deletePost(post) {
  return fetch(`${host}/posts/${post.id}`, requestParams("DELETE")).then(
    data => data.json(),
    error => console.log(error)
  );
}

function deleteComment(comment) {
  return fetch(`${host}/comments/${comment.id}`, requestParams("DELETE")).then(
    data => data.json(),
    error => console.log(error)
  );
}

function getFullPost(postId) {
  return new Promise((resolve, reject) => {
    fetch(`${host}/posts/${postId}`, requestParams("GET"))
      .then(postResult => {
        return postResult.json();
      })
      .then(post => {
        return fetch(`${host}/posts/${postId}/comments`, requestParams("GET"))
          .then(commentsResult => {
            return commentsResult.json();
          })
          .then(comments => {
            let fullPost = {
              ...post,
              comments
            };
            resolve(fullPost);
          });
      });
  });
}

function listPosts() {
  return fetch(`${host}/posts`, requestParams("GET")).then(
    data => data.json(),
    error => console.log(error)
  );
}

function listCategoryPosts(category) {
  return fetch(`${host}/${category}/posts`, requestParams("GET")).then(
    data => data.json(),
    error => console.log(error)
  );
}

function votePost(post, positive) {
  let body = {
    option: positive ? "upVote" : "downVote"
  };
  return fetch(`${host}/posts/${post.id}`, requestParams("POST", body)).then(
    data => data.json(),
    error => console.log(error)
  );
}

function voteComment(comment, positive) {
  let body = {
    option: positive ? "upVote" : "downVote"
  };
  return fetch(
    `${host}/comments/${comment.id}`,
    requestParams("POST", body)
  ).then(data => data.json(), error => console.log(error));
}

function listCategories() {
  return fetch(`${host}/categories`, requestParams("GET")).then(
    data => data.json(),
    error => console.log(error)
  );
}

function updatePost(post) {
  return fetch(`${host}/posts/${post.id}`, requestParams("PUT", post)).then(
    data => data.json(),
    error => console.log(error)
  );
}

function updateComment(comment) {
  return fetch(
    `${host}/comments/${comment.id}`,
    requestParams("PUT", comment)
  ).then(data => data.json(), error => console.log(error));
}

const postAPI = {
  listPosts,
  listCategories,
  listCategoryPosts,
  createPost,
  deletePost,
  votePost,
  getFullPost,
  voteComment,
  deleteComment,
  createComment,
  updatePost,
  updateComment
};

export default postAPI;
