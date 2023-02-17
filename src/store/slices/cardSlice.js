import { createSlice } from "@reduxjs/toolkit";

import fetchTickets from "./ActionAsyncCreater";

const initialState = {
  tickets: [],
  isLoading: true,
  isError: 0,
  count: 5,
  searchId: "",
};

const ticketData = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    setSearchId(state, action) {
      return { ...state, searchId: action.payload };
    },
    setCount(state, action) {
      return { ...state, count: action.payload };
    },
  },
  extraReducers: {
    [fetchTickets.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchTickets.fulfilled.type]: (state, action) => {
      state.tickets = [...state.tickets, ...action.payload.tickets];
      state.isLoading = !action.payload.stop;
    },
    [fetchTickets.rejected.type]: (state) => {
      state.isError += 1;
    },
  },
});

export const { setSearchId, setIsLoading, setCount } = ticketData.actions;
export default ticketData.reducer;
