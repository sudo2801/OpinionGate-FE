import reducers from "../ducks";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import logger from "redux-logger";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({ ...reducers });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
});

export const dispatch = store.dispatch;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<any>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
