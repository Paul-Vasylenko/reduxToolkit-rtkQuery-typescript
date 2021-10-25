import React, { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { fetchUsers } from "./store/reducers/actionCreators";

function App() {
  const { loading, errors, users } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  return (
    <div>
      {loading && "Loading proccess"}
      {errors.length > 0 && errors.join(";")}
      {users.map((user) => (
        <div key={user.id}>
          {user.id}. {user.name}
        </div>
      ))}
    </div>
  );
}

export default App;
