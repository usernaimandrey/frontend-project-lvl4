import {
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { fetchGetData } from './chennelReducer.js';

const messagesAdapter = createEntityAdapter();

export const messagesSlices = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),

  extraReducers: (builder) => {
    builder
      .addCase(fetchGetData.fulfilled, (state, { payload: { messages } }) => {
        messagesAdapter.setAll(state, messages);
      });
  },
});

export const selecrorsMessages = messagesAdapter.getSelectors((state) => state.messages);

export default messagesSlices.reducer;
