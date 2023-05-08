import { createSlice, configureStore } from "@reduxjs/toolkit";

const searchInitialState = {
  searchTerm: "",
};

// const watchlistInitialState = {
//   watchlist: JSON.parse(sessionStorage.getItem('watchlist')),
// };

// const seenlistInitialState = {
//   seenlist: JSON.parse(sessionStorage.getItem('watchlist')),
// };


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

// const watchlistSlice = createSlice({
//   name: 'watchlist',
//   initialState: {
//     watchlist: watchlistInitialState
//   },
//   reducers: {
//     addItemToWatchlist: (state, action) => {
//       const newWatchlist = { ...state.watchlist, [action.payload[0]]: action.payload[1] }
//       sessionStorage.setItem('watchlist', JSON.stringify(newWatchlist))
//       state.watchlist = newWatchlist
//     },
//     removeItemFromWatchlist: (state, action) => {
//       const newWatchlist = { ...state.watchlist }
//       delete newWatchlist[action.payload]
//       sessionStorage.setItem('watchlist', JSON.stringify(newWatchlist))
//       state.watchlist = newWatchlist
//     },
    
//   }
// })

// const seenlistSlice = createSlice({
//   name: 'watchlist',
//   initialState: {
//     seenlist: seenlistInitialState
//   },
//   reducers: {
//     addItemToSeenlist: (state, action) => {
//       const newSeenlist = { ...state.seenlist, [action.payload[0]]: action.payload[1] }
//       sessionStorage.setItem('seenlist', JSON.stringify(newSeenlist))
//       state.seenlist = newSeenlist
//     },
//     removeItemFromSeenlist: (state, action) => {
//       const newSeenlist = { ...state.seenlist }
//       delete newSeenlist[action.payload]
//       sessionStorage.setItem('seenlist', JSON.stringify(newSeenlist))
//       state.seenlist = newSeenlist
//     }
    
//   }
// })


// Export actions
export const { setSearchTerm } = searchSlice.actions;
// export const { addItemToWatchlist, removeItemFromWatchlist } = watchlistSlice.actions;
// export const { addItemToSeenlist, removeItemFromSeenlist } = seenlistSlice.actions;


const rootReducer = {
  search: searchSlice.reducer,
  // watchlist: watchlistSlice.reducer,
  // seenlist: seenlistSlice.reducer
};


// Create store
const store = configureStore({
  reducer: rootReducer,
});

export default store;
