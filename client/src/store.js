import { createSlice, configureStore } from "@reduxjs/toolkit";

// Initialise states
const searchInitialState = {
  searchTerm: "",
};

const homeMoviesInitialState = {
  homeMovies: JSON.parse(sessionStorage.getItem('homeMovies')),
};

const movieInitialState = {
  movie: JSON.parse(sessionStorage.getItem('movie')),
};

const genreInitialState = {
  genre: JSON.parse(sessionStorage.getItem('genre')),
};

const movieGenresInitialState = {
  movieGenres: JSON.parse(sessionStorage.getItem('movieGenres')),
};

const moviesByGenreInitialState = {
  moviesByGenre: JSON.parse(sessionStorage.getItem('moviesByGenre')),
};

const watchlistInitialState = {
  watchlist: JSON.parse(sessionStorage.getItem('watchlist')),
};

const seenlistInitialState = {
  seenlist: JSON.parse(sessionStorage.getItem('seenlist')),
};

const streamServiceState = {
  streamingService: JSON.parse(sessionStorage.getItem('streamingService'))
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

const homeMovies = createSlice({
  name: "home",
  initialState: homeMoviesInitialState,
  reducers: {
    setHomeMovies: (state, action) => {
      sessionStorage.setItem('homeMovies', JSON.stringify(action.payload))
      state.homeMovies = action.payload;
    },
    clearHomeMovies: (state) => {
      state.homeMovies = {}
    },
  },
});

const movieSlice = createSlice({
  name: "movie",
  initialState: movieInitialState,
  reducers: {
    setMovie: (state, action) => {
      sessionStorage.setItem('movie', JSON.stringify({[action.payload[0]]: action.payload[1] }))
      state.movie = {[action.payload[0]]: action.payload[1] }
    },
    clearMovie: (state) => {
      state.movie = {}
    },
  },
});

const streamingServiceSlice = createSlice({
  name: 'streamingservice',
  initialState: streamServiceState,
  reducers: {
    setStreamingService: (state, action) => {
      sessionStorage.setItem('streamingService', JSON.stringify({[action.payload[0]]: action.payload[1]}))
      state.streamingService = { [action.payload[0]]: action.payload[1] }
    },
    clearStreamingService: (state) => {
      state.streamingService = {}
    },
  },
});

const genreSlice = createSlice({
  name: "genre",
  initialState: genreInitialState,
  reducers: {
    setGenre: (state, action) => {
      sessionStorage.setItem('genre', JSON.stringify(action.payload))
      state.genre = action.payload
    },
    clearGenre: (state) => {
      state.genre = {}
    },
  },
});

const movieGenresSlice = createSlice({
  name: "movieGenres",
  initialState: movieGenresInitialState,
  reducers: {
    setMovieGenres: (state, action) => {
      sessionStorage.setItem('movieGenres', JSON.stringify(action.payload))
      state.movieGenres = action.payload
    },
    clearMovieGenres: (state) => {
      state.movieGenres = {}
    },
  },
});

const moviesByGenreSlice = createSlice({
  name: "moviesByGenre",
  initialState: moviesByGenreInitialState,
  reducers: {
    setMoviesByGenre: (state, action) => {
      sessionStorage.setItem('moviesByGenre', JSON.stringify(action.payload))
      state.moviesByGenre = action.payload
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

// Export actions
export const { setSearchTerm } = searchSlice.actions;
export const { setMovie, clearMovie } = movieSlice.actions;
export const { setStreamingService, clearStreamingService } = streamingServiceSlice.actions;
export const { setGenre, clearGenre } = genreSlice.actions;
export const { setHomeMovies, clearHomeMovies } = homeMovies.actions;
export const { initWatchlist, addItemToWatchlist, removeItemFromWatchlist, clearWatchlist } = watchlistSlice.actions;
export const { initSeenlist, addItemToSeenlist, removeItemFromSeenlist, clearSeenlist } = seenlistSlice.actions;
export const { setMovieGenres, clearMovieGenres } = movieGenresSlice.actions;
export const { setMoviesByGenre } = moviesByGenreSlice.actions;


const rootReducer = {
  search: searchSlice.reducer,
  movie: movieSlice.reducer,
  streamingService: streamingServiceSlice.reducer,
  genre: genreSlice.reducer,
  homeMovies: homeMovies.reducer,
  movieGenres: movieGenresSlice.reducer,
  watchlist: watchlistSlice.reducer,
  seenlist: seenlistSlice.reducer,
  setMoviesByGenre: moviesByGenreSlice.reducer,
};


// Create store
const store = configureStore({
  reducer: rootReducer,
});

export default store;