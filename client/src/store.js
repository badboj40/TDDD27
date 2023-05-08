import { createSlice, configureStore } from "@reduxjs/toolkit";

const searchInitialState = {
  searchTerm: "",
};

const movieInitialState = {
  movie: {},
}

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

const movieSlice = createSlice({
  name: "movie",
  initialState: movieInitialState,
  reducers: {
    setMovie: (state, action) => {
      state.movie = action.payload
    },
  },
});


// Export actions
export const { setSearchTerm } = searchSlice.actions;
export const { setMovie } = movieSlice.actions;


const rootReducer = {
  search: searchSlice.reducer,
  movie: movieSlice.reducer,
};


// Create store
const store = configureStore({
  reducer: rootReducer,
});

export default store;
