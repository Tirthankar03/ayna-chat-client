import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import chatReducer from "./chatSlice";
import { persistReducer, persistStore } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'
import {thunk} from 'redux-thunk';


const createNoopStorage = () => {
    return {
      getItem(_key: string) {
        return Promise.resolve(null)
      },
      setItem(_key: string, value: string) {
        return Promise.resolve(value)
      },
      removeItem(_key: string) {
        return Promise.resolve()
      },
    }
  }
  
  const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage()
  

const persistConfig = {
    key: 'root',
    version: 1,
    storage: storage,
    middleware: [thunk],
    // blacklist: [], 
};

const rootReducer = combineReducers({
    user: userReducer,
    chat: chatReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: MiddlewareArray =>
    MiddlewareArray({
      serializableCheck: false,
      thunk: true,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
