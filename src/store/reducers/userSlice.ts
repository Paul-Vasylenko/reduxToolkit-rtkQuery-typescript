import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import { fetchUsers } from "./actionCreators";

export interface IUserState {
  loading: boolean;
  errors: string[];
  users: IUser[];
}

const initialState: IUserState = {
  loading: false,
  errors: [],
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.pending.type]: (state) => {
      state.loading = true;
    },
    [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
      state.loading = false;
      state.users = action.payload;
      state.errors = [];
    },
    [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.errors = [action.payload];
    },
  },
});

export default userSlice.reducer;
