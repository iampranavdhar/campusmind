import { combineReducers } from "redux";
import { userSlice } from "../reducers/userReducer";
import { todoSlice } from "../reducers/todoReducer";
import { configureStore } from "@reduxjs/toolkit";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { eventSlice } from "../reducers/eventReducer";
import { announcementSlice } from "../reducers/announcementReducer";
import { batchSlice } from "../reducers/batchDetailReducer";
import { membersSlice } from "../reducers/membersReducer";
import { courseSlice } from "../reducers/courseReducer";
import { semSlice } from "../reducers/semReducer";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  todo: todoSlice.reducer,
  event: eventSlice.reducer,
  announcement: announcementSlice.reducer,
  batch: batchSlice.reducer,
  member: membersSlice.reducer,
  course: courseSlice.reducer,
  sem: semSlice.reducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export let persistor = persistStore(store);
export default store;
