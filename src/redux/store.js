import { configureStore } from "@reduxjs/toolkit";
import { spotifyAPI } from "./apiStore/SpotifyAPI";

import playerReducer from "./slices/PlayerSlice";
import promptReducer from "./slices/SearchPrompt";

const logger = (store) => (next) => (action) => {
    // console.log('dispatching', action);
    const result = next(action);
    // console.log('next state', store.getState());
    return result;
}

export const store = configureStore({
    reducer:{
        [spotifyAPI.reducerPath]: spotifyAPI.reducer,
        player: playerReducer,
        promptString: promptReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(spotifyAPI.middleware, logger)
})