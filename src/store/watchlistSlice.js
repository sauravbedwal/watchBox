import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const watchlistSlice = createSlice({
    name: "watchList",
    initialState: {
        list: null,
    },
    reducers: {
        getWatchList: (state, action) => {
            state.url = action.payload;
        },
    }
})


export const addToWatchlist = (showId, token) => async (dispatch) => {
    // console.log("line 121", showId)
    try {
        // const storedUser = JSON.parse(localStorage.getItem('user'));
        // const token = storedUser.token;
        // console.log("line 124", token)

        const response = await axios.patch(
            `https://academics.newtonschool.co/api/v1/social_media/watchlist/${showId}`,
            // `https://academics.newtonschool.co/api/v1/social_media/watchlist`,
            // { showId }, // Pass the showId in the request body
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    projectId: 'f104bi07c490',
                },
            }
        );
        console.log("line 137", response.data)
        if (response) {
            dispatch(getWatchList(response.data));
        }
    } catch (error) {
        console.log("error", error)
        dispatch(getWatchList(error.message));
    }
}
// Action creators are generated for each case reducer function
export const { getWatchList } = watchlistSlice.actions

export default watchlistSlice.reducer