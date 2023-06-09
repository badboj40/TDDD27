import { createSlice, configureStore } from "@reduxjs/toolkit";

// Initialise states
const searchInitialState = {
  searchTerm: JSON.parse(sessionStorage.getItem("searchTerm")),
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

const sliderInitialState = {
  slider: Date.now()
}

const searchFilterInitialState = {
  genreFilter: [],
  yearFilter: [1950, 2023],
  ratingFilter: 0,
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
      sessionStorage.setItem("searchTerm", JSON.stringify(action.payload));
      state.searchTerm = action.payload
    },
    clearSearchTerm: (state) => {
      state.searchTerm = {}
    },
  },
});

const homeMoviesSlice = createSlice({
  name: "homeMovies",
  initialState: homeMoviesInitialState,
  reducers: {
    setHomeMovies: (state, action) => {
      sessionStorage.setItem('homeMovies', JSON.stringify(action.payload))
      state.homeMovies = action.payload;
    },
    clearHomeMovies: (state) => {
      state.homeMovies = {}
      sessionStorage.removeItem('homeMovies')
    },
  },
});

const movieSlice = createSlice({
  name: "movie",
  initialState: movieInitialState,
  reducers: {
    setMovie: (state, action) => {
      sessionStorage.setItem('movie', JSON.stringify({ [action.payload[0]]: action.payload[1] }))
      state.movie = { [action.payload[0]]: action.payload[1] }
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
      sessionStorage.setItem('streamingService', JSON.stringify({ [action.payload[0]]: action.payload[1] }))
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
    }
  }
});

const sliderSlice = createSlice({
  name: "slider",
  initialState: sliderInitialState,
  reducers: {
    setSlider: (state, action) => {
      state.slider = action.payload
    },
  },
});

const searchFilterSlice = createSlice({
  name: 'searchFilter',
  initialState: searchFilterInitialState,
  reducers: {
    clearSearchFilter: (state) => {
      state.genreFilter = []
      state.yearFilter = [1950, 2023]
      state.ratingFilter = 0
    },
    addToGenreFilter: (state, action) => {
      const newGenreFilter = [...state.genreFilter, action.payload]
      state.genreFilter = newGenreFilter
    },
    removeFromGenreFilter: (state, action) => {
      const newGenreFilter = [...state.genreFilter]
      const index = newGenreFilter.indexOf(action.payload);
      if (index !== -1) {
        newGenreFilter.splice(index, 1);
      }
      state.genreFilter = newGenreFilter
    },
    setYearFilter: (state, action) => {
      const newYearFilter = action.payload
      state.yearFilter = newYearFilter
    },
    setRatingFilter: (state, action) => {
      state.ratingFilter = action.payload
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
export const { setSearchTerm,
  clearSearchTerm } = searchSlice.actions;
export const { setMovie,
  clearMovie } = movieSlice.actions;
export const { setStreamingService,
  clearStreamingService } = streamingServiceSlice.actions;
export const { setGenre,
  clearGenre } = genreSlice.actions;
export const { setHomeMovies,
  clearHomeMovies } = homeMoviesSlice.actions;
export const { setMovieGenres,
  clearMovieGenres } = movieGenresSlice.actions;
export const { setSlider } = sliderSlice.actions;
export const { addToGenreFilter,
  removeFromGenreFilter,
  setYearFilter,
  setRatingFilter,
  setSearchFilter,
  clearSearchFilter, } = searchFilterSlice.actions;
export const { initWatchlist,
  addItemToWatchlist,
  removeItemFromWatchlist,
  clearWatchlist } = watchlistSlice.actions;
export const { initSeenlist,
  addItemToSeenlist,
  removeItemFromSeenlist,
  clearSeenlist } = seenlistSlice.actions;
export const { setMoviesByGenre } = moviesByGenreSlice.actions;


const rootReducer = {
  search: searchSlice.reducer,
  movie: movieSlice.reducer,
  streamingService: streamingServiceSlice.reducer,
  genre: genreSlice.reducer,
  homeMovies: homeMoviesSlice.reducer,
  movieGenres: movieGenresSlice.reducer,
  slider: sliderSlice.reducer,
  searchFilter: searchFilterSlice.reducer,
  watchlist: watchlistSlice.reducer,
  seenlist: seenlistSlice.reducer,
  setMoviesByGenre: moviesByGenreSlice.reducer,
};


// Create store
const store = configureStore({
  reducer: rootReducer,
});

export default store;