import React, { useState } from "react";
import "./postStuff.css";
import Comments from "./Comments";

function PostStuff({ post, currentUser, handleDeletePost }) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(post.comments);
  const [showComments, setShowComments] = useState(false);

  function handleAddComment(e) {
    e.preventDefault();
    if (currentUser) {
      fetch("http://localhost:3000/comments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: currentUser.id,
          post_id: post.id,
          content: newComment,
        }),
      })
        .then((res) => res.json())
        .then((com) => {
          setComments([...comments, com]);
          setNewComment("");
        });
    } else {
      alert("please login to comment");
    }
  }

  function handleDelete(id) {
    console.log(id);
    fetch(`http://localhost:3000/comments/${id}`, {
      method: "DELETE",
    });
    const updated = comments.filter((comment) => comment.id !== id);
    setComments(updated);
  }

  function confirmDelete(id) {
    console.log(id);
    const confirmthis = window.confirm("Are you sure you wish to delete??");
    // console.log(confirmthis);
    if (confirmthis === true) {
      handleDeletePost(id);
    }
  }
  // console.log(post);
  return (
    <div>
      <div className="feed-card">
        <img className="feed-card-img" src={post.image} alt={post.title} />

        <div className="feed-card-body">
          <div className="feed-overline">By {post.author}</div>
          <div className="feed-card-title">{post.title}</div>
          <div className="feed-card-subtitle">{post.content}</div>
        </div>

        <div className="feed-card-footer">
          <form onSubmit={handleAddComment}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></input>
            <br></br>
            <button className="feed-btn" type="submit">
              Leave Comment
            </button>
          </form>
          <br></br>
          <button
            className="feed-btn"
            onClick={() => setShowComments(!showComments)}
          >
            {showComments ? "Hide Comments" : "Show Comments"}
          </button>
          {showComments && (
            <Comments
              comments={comments}
              handleDelete={handleDelete}
              currentUser={currentUser}
            />
          )}

          {currentUser && post.author === currentUser.username && (
            <button
              className="feed-btn-delete"
              type="submit"
              // onClick={() => handleDeletePost(post.id)}
              onClick={() => confirmDelete(post.id)}
            >
              Delete Post
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostStuff;

//      <div>
//   <h1>{post.title}</h1>
//   <img src={post.image} alt={post.title} />
//   <h3>By {post.author}</h3>
//   <p>{post.content}</p>
// </div>
