import { createSlice, configureStore } from "@reduxjs/toolkit";

// Initialise states
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

const profilePictureState = {
  profilePicture: ""
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

const profilePictureSlice = createSlice({
  name: 'profilePicture',
  initialState: profilePictureState,
  reducers: {
    initProfilePic: (state, action) => {
      state.profilePicture = action.payload
    },
    clearProfilePic: (state) => {
      state.profilePicture = ""
    },
  },
});

const streamingServiceSlice = createSlice({
  name: 'streamingservice',
  initialState: streamServiceState,
  reducers: {
    initStreamingService: (state) => {
      state.streamingService = streamServiceState
    },
    setStreamingService: (state, action) => {
      const newStreamingService = { ...state.streamingService, [action.payload[0]]: action.payload[1]}
      //sessionStorage.setItem('seenlist', JSON.stringify(newSeenlist))
      state.streamingService = newStreamingService
    },
    clearStreamingService: (state) => {
      state.streamingService = {}
    },
  },
});

// Export actions
export const { setSearchTerm } = searchSlice.actions;
export const { setMovie } = movieSlice.actions;
export const { initWatchlist, addItemToWatchlist, removeItemFromWatchlist, clearWatchlist } = watchlistSlice.actions;
export const { initSeenlist, addItemToSeenlist, removeItemFromSeenlist, clearSeenlist } = seenlistSlice.actions;
export const { initProfilePic, clearProfilePic } = profilePictureSlice.actions;
export const { initStreamingService, setStreamingService, getStreamingService, clearStreamingService } = streamingServiceSlice.actions;


const rootReducer = {
  search: searchSlice.reducer,
  movie: movieSlice.reducer,
  watchlist: watchlistSlice.reducer,
  seenlist: seenlistSlice.reducer,
  profilePic: profilePictureSlice.reducer,
  streamingService: streamingServiceSlice.reducer,
};


// Create store
const store = configureStore({
  reducer: rootReducer,
});

export default store;
