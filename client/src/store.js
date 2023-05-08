import { createSlice, configureStore } from "@reduxjs/toolkit";

const searchInitialState = {
  searchTerm: "",
};

// Define slice
const searchSlice = createSlice({
  name: "search",
  initialState: searchInitialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});


// Export actions
export const { setSearchTerm } = searchSlice.actions;


const rootReducer = {
  search: searchSlice.reducer,
};


// Create store
const store = configureStore({
  reducer: rootReducer,
});

export default store;
