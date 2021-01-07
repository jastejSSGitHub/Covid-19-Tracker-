import { configureStore } from '@reduxjs/toolkit';
import colorReducer from '../features/colorSlice';

export default configureStore({
  reducer: {
    color: colorReducer,
  },
});