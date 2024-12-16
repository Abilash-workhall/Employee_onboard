import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from './exampleSlice';

const store = configureStore({
  reducer: {
    example: exampleReducer, // This 'example' key should match the one used in useSelector
  },
});

export default store;
