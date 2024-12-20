import { configureStore } from '@reduxjs/toolkit';
import UserReducer from "../slices/UserSlice"
import DataReducer from "../slices/DataSlice"
const store = configureStore({
  reducer: {
    UserData: UserReducer,
    data: DataReducer
  },
});

export default store;
