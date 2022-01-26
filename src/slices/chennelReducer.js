/* eslint-disable no-param-reassign */
import axios from 'axios';
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import routes from '../routes.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

export const fetchGetData = createAsyncThunk(
  'channel/fetchGetData',
  async () => {
    const { data } = await axios.get(routes.getDataPath(), { headers: getAuthHeader() });
    return data;
  },
);

const channelAdapter = createEntityAdapter();

export const channelSlices = createSlice({
  name: 'channel',
  initialState: channelAdapter.getInitialState({ currentChannelId: '', loading: 'no data', error: null }),
  reducers: {
    addChannel: (state, { payload }) => {
      const { channel } = payload;
      channelAdapter.addOne(state, channel);
    },
    changeCannel: (state, { payload }) => {
      const { id } = payload;
      state.currentChannelId = id;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGetData.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchGetData.fulfilled, (state, { payload }) => {
        const { channels, currentChannelId } = payload;
        state.currentChannelId = currentChannelId;
        channelAdapter.setAll(state, channels);
        state.loading = 'success';
        state.error = null;
      })
      .addCase(fetchGetData.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error;
      });
  },
});

export const { addChannel, changeCannel } = channelSlices.actions;

export const selectorsChannels = channelAdapter.getSelectors((state) => state.channel);

export default channelSlices.reducer;
