import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "../../shared/models/user.interface";

type initialStateType = {
  users: User[];
  loading: boolean;
  error: string | null;
  currentUser: User | null;
};

const initialState: initialStateType = {
  users: [],
  loading: false,
  error: null,
  currentUser: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    usersAdded(state, action: PayloadAction<User>) {
      const {
        payload: { id, firstName, lastName, email, password },
      } = action;

      state.users.push({
        id,
        firstName,
        lastName,
        email,
        password,
      });
    },
    setCurrentUser(state, action: PayloadAction<User | null>) {
      state.currentUser = action.payload;
    },
    loadUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
  },
});

export const { usersAdded, setCurrentUser, loadUsers } = usersSlice.actions;
export default usersSlice.reducer;
