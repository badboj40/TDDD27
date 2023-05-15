import { createSlice, configureStore } from "@reduxjs/toolkit";

// Initialise states
const searchInitialState = {
  searchTerm: "",
};

const homeInitialState = {
  home: {},
};

const movieInitialState = {
  movie: {},
};

const genreInitialState = {
  genre: {},
};

const movieGenresInitialState = {
  movieGenres: {},
};

const watchlistInitialState = {
  watchlist: JSON.parse(sessionStorage.getItem('watchlist')),
};

const seenlistInitialState = {
  seenlist: JSON.parse(sessionStorage.getItem('seenlist')),
};

const streamServiceState = {
  streamingService: {}
};

// Create slices
const searchSlice = createSlice({
  name: "search",
  initialState: searchInitialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

const homeSlice = createSlice({
  name: "home",
  initialState: homeInitialState,
  reducers: {
    setHomeMovies: (state, action) => {
      state.home = action.payload;
      //sessionStorage.setItem('popularMovies', JSON.stringify(action.payload))
    },
    clearHomeMovies: (state) => {
      state.home = homeInitialState
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

const genreSlice = createSlice({
  name: "genre",
  initialState: genreInitialState,
  reducers: {
    setGenre: (state, action) => {
      state.genre = action.payload
    },
  },
});

const movieGenresSlice = createSlice({
  name: "movieGenres",
  initialState: movieGenresInitialState,
  reducers: {
    setMovieGenres: (state, action) => {
      state.movieGenres = action.payload
    },
  },
});

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: watchlistInitialState,
  reducers: {
    initWatchlist: (state) => {
      state.watchlist = JSON.parse(sessionStorage.getItem('watchlist'))
    },
    addItemToWatchlist: (state, action) => {
      const newWatchlist = { ...state.watchlist, [action.payload[0]]: action.payload[1] }
      sessionStorage.setItem('watchlist', JSON.stringify(newWatchlist))
      state.watchlist = newWatchlist
    },
    removeItemFromWatchlist: (state, action) => {
      const newWatchlist = { ...state.watchlist }
      delete newWatchlist[action.payload]
      sessionStorage.setItem('watchlist', JSON.stringify(newWatchlist))
      state.watchlist = newWatchlist
    },
    clearWatchlist: (state) => {
      state.watchlist = {}
    },
  },
});

const seenlistSlice = createSlice({
  name: 'seenlist',
  initialState: seenlistInitialState,
  reducers: {
    initSeenlist: (state) => {
      state.seenlist = JSON.parse(sessionStorage.getItem('seenlist'))
    },
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
    },
    clearSeenlist: (state) => {
      state.seenlist = {}
    },
  },
});

const streamingServiceSlice = createSlice({
  name: 'streamingservice',
  initialState: streamServiceState,
  reducers: {
    setStreamingService: (state, action) => {
      state.streamingService = { [action.payload[0]]: action.payload[1] }
    },
  },
});

// Export actions
export const { setSearchTerm } = searchSlice.actions;
export const { setMovie } = movieSlice.actions;
export const { setGenre } = genreSlice.actions;
export const { setHomeMovies, clearHomeMovies } = homeSlice.actions;
export const { initWatchlist, addItemToWatchlist, removeItemFromWatchlist, clearWatchlist } = watchlistSlice.actions;
export const { initSeenlist, addItemToSeenlist, removeItemFromSeenlist, clearSeenlist } = seenlistSlice.actions;
export const { setStreamingService } = streamingServiceSlice.actions;
export const { setMovieGenres } = movieGenresSlice.actions;


const rootReducer = {
  search: searchSlice.reducer,
  movie: movieSlice.reducer,
  genre: genreSlice.reducer,
  home: homeSlice.reducer,
  movieGenres: movieGenresSlice.reducer,
  watchlist: watchlistSlice.reducer,
  seenlist: seenlistSlice.reducer,
  streamingService: streamingServiceSlice.reducer,
};


// Create store
const store = configureStore({
  reducer: rootReducer,
});

export default store;