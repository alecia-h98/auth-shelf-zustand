import { create } from 'zustand';
import devtools from 'zustand/middleware';
import userSlice from './slices/user.slice.js';
import shelfSlice from './slices/shelf.slice.js';

// Combine all slices in the store:
const useStore = create(
  devtools((...args) => ({
    ...userSlice(...args),
    ...shelfSlice(...args),
  }))
);

export default useStore;
