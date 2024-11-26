import { configureStore } from "@reduxjs/toolkit";
import customer from "@/lib/slides/customer";
import admin from "@/lib/slides/admin"

export const createStore = () =>
  configureStore({
    reducer: {
      customer,
      admin
    },
  });

export type AppStore = ReturnType<typeof createStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']
