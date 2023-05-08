import { createSlice, configureStore } from "@reduxjs/toolkit";

const searchInitialState = {
  searchTerm: "",
};

const movieInitialState = {
  movie: {},
}

const watchlistInitialState = {
  watchlist: JSON.parse(sessionStorage.getItem('watchlist')),
};

const seenlistInitialState = {
  seenlist: JSON.parse(sessionStorage.getItem('seenlist')),
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

const movieSlice = createSlice({
  name: "movie",
  initialState: movieInitialState,
  reducers: {
    setMovie: (state, action) => {
      state.movie = action.payload
    },
  },
});

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: watchlistInitialState,
  reducers: {
    addItemToWatchlist: (state, action) => {
      const newWatchlist = { ...state.watchlist, [action.payload[0]]: action.payload[1] }
      sessionStorage.setItem('watchlist', JSON.stringify(newWatchlist))
      state.watchlist = newWatchlist
    },
    removeItemFromWatchlist: (state, action) => {
      console.log(state)
      const newWatchlist = { ...state.watchlist }
      delete newWatchlist[action.payload]
      sessionStorage.setItem('watchlist', JSON.stringify(newWatchlist))
      state.watchlist = newWatchlist
    },
    
  }
})

const seenlistSlice = createSlice({
  name: 'seenlist',
  initialState: seenlistInitialState,
  reducers: {
    addItemToSeenlist: (state, action) => {
      const newSeenlist = { ...state.seenlist, [action.payload[0]]: action.payload[1] }
      sessionStorage.setItem('seenlist', JSON.stringify(newSeenlist))
      state.seenlist = newSeenlist
    },
    removeItemFromSeenlist: (state, action) => {
      const newSeenlist = { ...state.seenlist }
      delete newSeenlist[action.payload]
      sessionStorage.setItem('seenlist', JSON.stringify(newSeenlist))
      state.seenlist = newSeenlist
    }
    
  }
})



// Export actions
export const { setSearchTerm } = searchSlice.actions;
export const { setMovie } = movieSlice.actions;
export const { addItemToWatchlist, removeItemFromWatchlist } = watchlistSlice.actions;
export const { addItemToSeenlist, removeItemFromSeenlist } = seenlistSlice.actions;



const rootReducer = {
  search: searchSlice.reducer,
  movie: movieSlice.reducer,
  watchlist: watchlistSlice.reducer,
  seenlist: seenlistSlice.reducer
};


// Create store
const store = configureStore({
  reducer: rootReducer,
});

export default store;
