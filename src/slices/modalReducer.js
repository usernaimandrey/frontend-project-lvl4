/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addChannelModalState: false,
  removeChannelModalState: false,
  renameModalState: false,
  removeId: null,
  renameId: null,
  renameChannelName: null,
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
    renameChannelShow: (state) => {
      state.renameModalState = !state.renameModalState;
    },
    setRenameId: (state, { payload }) => {
      const { id } = payload;
      state.renameId = id;
    },
    setRemoveId: (state, { payload }) => {
      const { id } = payload;
      state.removeId = id;
    },
    setRenameName: (state, { payload }) => {
      const { name } = payload;
      state.renameChannelName = name;
    },
  },
});

export const {
  addChannelShow, removeChannelShow, setRemoveId, setRenameId, renameChannelShow, setRenameName,
} = modalSlice.actions;

export default modalSlice.reducer;
