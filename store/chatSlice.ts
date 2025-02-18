// chatSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      const { sessionId, messages } = action.payload;
      state[sessionId] = messages;
    },
    addMessage: (state, action) => {
      const { sessionId, message } = action.payload;
      if (!state[sessionId]) state[sessionId] = [];
      state[sessionId].push(message);
    },
  },
});

export const { setMessages, addMessage } = chatSlice.actions;

export default chatSlice.reducer;
