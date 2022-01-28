/* eslint-disable no-param-reassign */
import {
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { fetchGetData, removeChannel } from './chennelReducer.js';

const messagesAdapter = createEntityAdapter();

export const messagesSlices = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState({ connectionErr: false }),

  reducers: {
    addNewMessages: (state, { payload }) => {
      const { msg } = payload;
      messagesAdapter.addOne(state, msg);
    },
    setConnectionErr: (state) => {
      state.connectionErr = !state.connectionErr;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGetData.fulfilled, (state, { payload: { messages } }) => {
        messagesAdapter.setAll(state, messages);
      })
      .addCase(removeChannel, (state, { payload }) => {
        const { id } = payload;
        const newEntities = Object.keys(state.entities)
          .reduce((acc, el) => {
            if (state.entities[el].channelId !== id) {
              return { [el]: state.entities[el], ...acc };
            }
            return acc;
          }, {});
        messagesAdapter.setAll(state, newEntities);
      });
  },
});

export const { addNewMessages, setConnectionErr } = messagesSlices.actions;

export const selecrorsMessages = messagesAdapter.getSelectors((state) => state.messages);

export default messagesSlices.reducer;
