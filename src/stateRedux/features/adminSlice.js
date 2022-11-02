import cookie from 'react-cookies'
import { postItems, getItems } from '../../components/helper/helper';
import { getItemsUsers } from './usersSlice';
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


const initialState = {
    isLoggedIn: false,
    isLoading: true,
    admin: null
}

const url = 'https://qadir-bricks-company.herokuapp.com/api/v1/admin';
export const LoginUser = createAsyncThunk('admin/login-admin', async (data, apiThunk) => {
    try {
        const user = await postItems(`${url}/login`, data);
        if (user.status !== 200) return;
        cookie.save('jwt', user.data.token, { path: '/' })
        apiThunk.dispatch(getItemsUsers())
        return user.data;
    } catch (error) {
        return apiThunk.rejectWithValue(error.response.data.message)
    }
})

export const LoggedInUserCheck = createAsyncThunk('admin/loggedIn-admin', async (_, apiThunk) => {
    const cookies = cookie.loadAll()
    try {
        if (!cookies.jwt) return apiThunk.rejectWithValue('Cookie isnt availble')
        const user = await getItems(`${url}/loggedin`)
        if (user.data.status === "success") {
        } else {
            cookie.remove('jwt')
        }
        apiThunk.dispatch(getItemsUsers())
        return user.data
    } catch (error) {
        cookie.remove('jwt')
        return apiThunk.rejectWithValue('Not loggedIn Admin')
    }
})


const adminSlice = createSlice({
    name: 'Admin-Info',
    initialState: initialState,
    reducers: {
        loggedInUser: (state) => {
            state.isLoading = false
            state.isLoggedIn = true
        },
        logoutUser: (state) => {
            state.isLoggedIn = false
        },
        isLoadingOff: (state)=>{
            state.isLoading = false
        }
    },
    extraReducers: {
        [LoginUser.fulfilled]: (state, action) => {
            const { user } = action.payload.data;
            state.admin = { name: user.name, email: user.email }
            // state.isLoading = false
            state.isLoggedIn = true
        },
        [LoginUser.rejected]: (state, action) => {
            state.isLoading = false
            state.isLoggedIn = false
        },
        [LoggedInUserCheck.pending]: (state, action) => {
            state.isLoading = true
            state.isLoggedIn = false
        },
        [LoggedInUserCheck.fulfilled]: (state, action) => {
            // state.isLoading = false
            state.isLoggedIn = true
        },
        [LoggedInUserCheck.rejected]: (state, action) => {
            state.isLoading = false
            state.isLoggedIn = false
        }
    }
})

export const { loggedInUser, logoutUser,isLoadingOff } = adminSlice.actions;
export default adminSlice.reducer;