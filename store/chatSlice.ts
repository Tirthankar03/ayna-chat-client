// chatSlice.js
import { Message } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit';


interface ChatState {
  [sessionId: string]: Message[]; 
}
const initialState: ChatState = {};



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
