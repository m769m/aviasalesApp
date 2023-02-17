import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchTickets = createAsyncThunk("tickets/fetchAll", async (params) => {
  const { data } = await axios.get(`https://aviasales-test-api.kata.academy/tickets?searchId=${params}`);
  return data;
});

export default fetchTickets;
