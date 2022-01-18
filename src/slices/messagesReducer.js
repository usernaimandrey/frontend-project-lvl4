import {
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { fetchGetData } from './chennelReducer.js';

const messagesAdapter = createEntityAdapter();

export const messagesSlices = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),

  reducers: {
    addNewMessages: (state, { payload: { msg } }) => {
      messagesAdapter.addOne(state, msg);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGetData.fulfilled, (state, { payload: { messages } }) => {
        messagesAdapter.setAll(state, messages);
      });
  },
});

export const { connect, addNewMessages, sendMessage } = messagesSlices.actions;

export const selecrorsMessages = messagesAdapter.getSelectors((state) => state.messages);

export default messagesSlices.reducer;
