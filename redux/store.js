import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userSlice from "./slices/userslice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
//import storage from "redux-persist/lib/storage"; // defaults to localStorage for our  web app
import AsyncStorage from "@react-native-async-storage/async-storage";

const rootReducer = combineReducers({
  user: userSlice,
  //reducers here
});
const authPersistConfig = {
  key: "jarvis",
  storage: AsyncStorage,
  whitelist: ["user"],
};
const persistedReducer = persistReducer(authPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
