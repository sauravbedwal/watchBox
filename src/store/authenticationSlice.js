import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const authenticationSlice = createSlice({
    name: "auth",
    initialState: {
        status: "",
        password: "",
        error: "",
    },
    reducers: {
        getLogIn: (state, action) => {
            // console.log("log", action.payload);
            state.status = action.payload;
        },

        getSignUp: (state, action) => {
            // console.log("sign", action.payload);
            state.status = action.payload;
        },

        getUpdatePassword: (state, action) => {
            state.password = action.payload;
        },

        getError: (state, action) => {
            state.error = action.payload;
        }
    }
})

export const signUp = (name, email, password) => async dispatch => {
    try {
        const response = await axios.post('https://academics.newtonschool.co/api/v1/user/signup', {
            name,
            email,
            password,
            appType: 'ott',
        }, {
            headers: {
                projectId: 'f104bi07c490',
            },
        });

        // console.log("loginC", response);
        dispatch(getSignUp(response.data));
    } catch (error) {
        // alert(error.message)
        dispatch(getError(error.message));
    }
};

export const login = (email, password) => async (dispatch) => {
    try {
        const response = await axios.post(
            "https://academics.newtonschool.co/api/v1/user/login",
            {
                email,
                password,
                appType: "ott",
            },
            {
                headers: {
                    projectId: "f104bi07c490",
                },
            }
        );
        // console.log("loginC", response.data);
        dispatch(getLogIn(response.data));
    } catch (error) {
        // alert(error.message)
        dispatch(getError(error.message));
    }
};


export const updatePassword =
    (name, email, passwordCurrent, newPassword, token) => async (dispatch) => {
        try {
            const response = await axios.patch(
                "https://academics.newtonschool.co/api/v1/user/updateMyPassword",
                {
                    name,
                    email,
                    passwordCurrent,
                    password: newPassword,
                    appType: "ott",
                },
                {
                    headers: {
                        projectId: "f104bi07c490",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response);
            dispatch(getUpdatePassword(response.data));
        } catch (error) {
            // alert(error.message)
            dispatch(getError(error.message));
        }
    };

// Action creators are generated for each case reducer function
export const { getLogIn, getSignUp, getUpdatePassword, getError } = authenticationSlice.actions

export default authenticationSlice.reducer

// response = data - data - data - name
// response.data = status - data - name
//action.payloa =  status - data - name

// status.data.name

