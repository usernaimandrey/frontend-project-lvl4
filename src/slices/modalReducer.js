/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addChannelModalState: false,
  removeChannelModalState: false,
  removeId: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    addChannelShow: (state) => {
      state.addChannelModalState = !state.addChannelModalState;
    },
    removeChannelShow: (state) => {
      state.removeChannelModalState = !state.removeChannelModalState;
    },
    setRemoveId: (state, { payload }) => {
      const { id } = payload;
      state.removeId = id;
    },
  },
});

export const { addChannelShow, removeChannelShow, setRemoveId } = modalSlice.actions;

export default modalSlice.reducer;
