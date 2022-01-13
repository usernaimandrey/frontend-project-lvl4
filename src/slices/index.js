import { configureStore } from '@reduxjs/toolkit';
import channelReducer from './chennelReducer.js';
import messagesReducer from './messagesReducer.js';

export default configureStore({
  reducer: {
    channel: channelReducer,
    messages: messagesReducer,
  },
});
