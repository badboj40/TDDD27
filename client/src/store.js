import { createSlice, configureStore } from "@reduxjs/toolkit";

const searchInitialState = {
  searchTerm: "",
};

const watchlistInitialState = {
  watchlist: [],
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

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: watchlistInitialState,
  reducers: {
    addWatchlistItem: (state, action) => {
      state.watchlist.push(action.payload);
    },
    removeWatchlistItem: (state, action) => {
      const indexToRemove = state.watchlist.indexOf(action.payload); // find the index of the element
      if (indexToRemove !== -1) { // check if the element is in the array
        state.watchlist.splice(indexToRemove, 1); // remove one element at the specified index
      }
    },
  },
});

// Export actions
export const { setSearchTerm } = searchSlice.actions;
export const { addWatchlistItem, removeWatchlistItem } = watchlistSlice.actions;


const rootReducer = {
  search: searchSlice.reducer,
  watchlist: watchlistSlice.reducer,
};


// Create store
const store = configureStore({
  reducer: rootReducer,
});

export default store;
