import { configureStore } from "@reduxjs/toolkit";
import { loadState, saveState } from "./localStorage";
import dataReducer from "./dataSlice";

// Load persisted state from local storage
const persistedState = loadState();

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
  preloadedState: persistedState, // Use preloaded state from local storage
  devTools: false,
});

// Save state to local storage whenever it changes
store.subscribe(() => {
  saveState({
    data: store.getState().data,
  });
});

export default store;
