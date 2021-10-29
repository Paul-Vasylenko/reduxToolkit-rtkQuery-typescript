import React, { useEffect, useState } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { fetchUsers } from "./store/reducers/actionCreators";
import { userSlice } from "./store/reducers/userSlice";
import { postAPI } from "./services/postService";
import { IPost } from "./models/IPost";

function App() {
  const { loading, errors, users } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const [userName, setUserName] = useState("");
  const [postTitle, setPostTitle] = useState("");
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleAddUser = () => {
    dispatch(userSlice.actions.addUser({ name: userName }));
  };

  //posts
  const { data: posts } = postAPI.useFetchAllUsersQuery(100);
  const [createPost, { isLoading: isLoadingPosts }] =
    postAPI.useCreatePostMutation();
  const [deletePost, {}] = postAPI.useDeleteMutation();
  const [updatePost, {}] = postAPI.useUpdatePostMutation();
  const handleCreatePost = async () => {
    await createPost({ title: postTitle, body: postTitle });
    setPostTitle("");
  };
  return (
    <div>
      {loading && "Loading proccess"}
      {errors.length > 0 && errors.join(";")}
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button onClick={handleAddUser}>Add</button>
      {users.map((user) => (
        <div key={user.id}>
          {user.id}. {user.name}
        </div>
      ))}
      <br />
      <br />
      <br />
      <h1>POSTS</h1>
      <input
        type="text"
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
      />
      <input type="submit" value="Create" onClick={handleCreatePost} />
      {isLoadingPosts
        ? "Loading..."
        : posts &&
          posts.map((post) => {
            const handleDeletePost = async (
              e: React.MouseEvent,
              postToDelete: IPost
            ) => {
              e.stopPropagation();

              await deletePost(postToDelete);
            };
            const handleUpdatePost = async (
              e: React.MouseEvent<HTMLDivElement>,
              postToUpdate: IPost
            ) => {
              e.stopPropagation();
              await updatePost({ ...postToUpdate, title: prompt() || "" });
            };
            return (
              <div key={post.id} onClick={(e) => handleUpdatePost(e, post)}>
                {post.id}. {post.title} &gt; {post.body}
                <br />
                <button onClick={(e) => handleDeletePost(e, post)}>
                  Delete
                </button>
                <br />
              </div>
            );
          })}
    </div>
  );
}

export default App;
