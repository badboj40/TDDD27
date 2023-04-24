import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
};

// Define slice
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

// Export actions
export const { setSearchTerm } = searchSlice.actions;

// Create store
const store = configureStore({
  reducer: searchSlice.reducer,
});

export default store;
