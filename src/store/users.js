import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import moment from "moment";

const slice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    usersRequested: (users, action) => {
      users.loading = true;
    },

    usersReceived: (users, action) => {
      users.list = action.payload;
      users.loading = false;
      users.lastFetch = Date.now();
    },

    usersRequestFailed: (users, action) => {
      users.loading = false;
    },

    userAdded: (users, action) => {
      users.list.push(action.payload);
    },

    userChangeEmail: (users, action) => {
      const { id, email } = action.payload;
      const index = users.list.findIndex((user) => user.id === id);
      if (index > -1) {
        users.list[index].email = email;
      }
    },

    userChangePassword: (users, action) => {
      //Toast notification "Password was changed successfuly!"
      console.log(`The password was changed: ${action.payload}`);
    },

    userRemoved: (users, action) => {
      const index = users.list.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index > -1) {
        users.list.splice(index, 1);
      }
    },
  },
});

export const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
  userAdded,
  userChangeEmail,
  userChangePassword,
  userRemoved,
} = slice.actions;
export default slice.reducer;

// Action Creators
const url = "/users";

export const loadUsers = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.users;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;

  return dispatch(
    apiCallBegan({
      url,
      onStart: usersRequested.type,
      onSuccess: usersReceived.type,
      onError: usersRequestFailed.type,
    })
  );
};

export const addUser = (user) =>
  apiCallBegan({
    url,
    method: "post",
    data: user,
    onSuccess: userAdded.type,
  });

export const removeUser = (id) =>
  apiCallBegan({
    url: url + "/" + id,
    method: "delete",
    onSuccess: userRemoved.type,
  });

export const changeUserEmail = (id, email) =>
  apiCallBegan({
    url: `${url}/${id}/email`,
    method: "patch",
    data: { email },
    onSuccess: userChangeEmail.type,
  });

export const changeUserPassword = (id, password) =>
  apiCallBegan({
    url: `${url}/${id}/password`,
    method: "patch",
    data: { password },
    onSuccess: userChangePassword.type,
  });

// Selector

// Memoization
