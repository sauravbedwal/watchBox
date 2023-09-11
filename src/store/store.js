import { configureStore } from '@reduxjs/toolkit'

import homeSlice from './homeSlice';
import authenticationSlice from './authenticationSlice';
import addWatchlistSlice from './addWatchlistSlice';

export const store = configureStore({
    reducer: {
        home: homeSlice,
        auth: authenticationSlice,
        watchList: addWatchlistSlice,
    },
});



// import { configureStore } from '@reduxjs/toolkit';
// import { combineReducers } from 'redux';
// import storage from 'redux-persist/lib/storage';
// import { persistReducer } from 'redux-persist';
// import homeSlice from './homeSlice';
// import authenticationSlice from './authenticationSlice';
// import { watchlistSlice } from './watchlistSlice';

// // Create a Redux Persist configuration for homeSlice
// const homeSlicePersistConfig = {
//     key: 'homeSlice',
//     storage,
// };

// // Combine the slices and wrap the ones you want to persist with persistReducer
// const rootReducer = combineReducers({
//     home: persistReducer(homeSlicePersistConfig, homeSlice.reducer),
//     auth: authenticationSlice.reducer,
//     watchList: watchlistSlice.reducer,
// });

// // Create the Redux store
// export const store = configureStore({
//     reducer: rootReducer,
// });

// export default store;