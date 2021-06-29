import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import blocksReducer from "../features/blocks/blocksSlice";
import undoable from "redux-undo";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    blocks: undoable(blocksReducer),
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
