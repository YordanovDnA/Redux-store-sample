import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import moment from "moment";

//Store slice template and reducers

const slice = createSlice({
  name: "customers",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    customersRequested: (customers, action) => {
      customers.loading = true;
    },

    customersReceived: (customers, action) => {
      customers.list = action.payload;
      customers.loading = false;
      customers.lastFetch = Date.now();
    },

    customersRequestFailed: (customers, action) => {
      customers.loading = false;
    },

    customerAdded: (customers, action) => {
      customers.list.push(action.payload);
    },

    customerRemoved: (customers, action) => {
      const index = customers.list.findIndex(
        (customer) => customer.id === action.payload.id
      );
      if (index > -1) {
        customers.list.splice(index, 1);
      }
    },
  },
});

export const {
  customersRequested,
  customersReceived,
  customersRequestFailed,
  customerAdded,
  customerRemoved,
} = slice.actions;
export default slice.reducer;

// Action Creators

const url = "/customers"; //The end point of an API you will use

export const loadCustomers = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.customers;
  //Create counter messuring the difference between same actions.
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;
  return dispatch(
    apiCallBegan({
      url,
      onStart: customersRequested.type,
      onSuccess: customersReceived.type,
      onError: customersRequestFailed.type,
    })
  );
};

export const addCustomer = (customer) =>
  apiCallBegan({
    url,
    method: "post",
    data: customer,
    onSuccess: customerAdded.type,
  });

export const removeCustomer = (id) =>
  apiCallBegan({
    url: url + "/" + id,
    method: "delete",
    onSuccess: customerRemoved.type,
  });

// Selector

// Memoization
