import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getItems, patchItems, postItems } from "../../components/helper/helper";
import { isLoadingOff } from "./adminSlice";
import { addModalUser, closeModalNewUser } from "./userModalSlice";

const initialState = {
    users: [],
    openBooked: [],
    closeBooked: [],
    isOpenBooked: 0,
    isCloseBooked: 0,
    isLoading: false,
}

const url = 'https://qadir-bricks-company.herokuapp.com/api/v1/'
export const getItemsUsers = createAsyncThunk('users/getAllUsers', async (_, apiThunk) => {
    try {
        const data = await getItems(url)
        apiThunk.dispatch(isLoadingOff())
        return data
    } catch (error) {
        return apiThunk.rejectWithValue('Cant get users something went wrong')
    }
})
export const endContracted = createAsyncThunk('user/endContract', async (id, apiThunk) => {
    try {
        const user = await patchItems(`${url}/${id}`, {
            active: false
        })
        apiThunk.dispatch(addModalUser(user.data.updatedUser))
        return user.data
    } catch (error) {
        return apiThunk.rejectWithValue('Cant get ended contract something went wrong')
    }
})

export const addNewUserBooked = createAsyncThunk('user/addNewUser', async (data, apiThunk) => {
    try {
        const user = await postItems(`${url}/`, data)
        if (user.status === 201) apiThunk.dispatch(closeModalNewUser())
        return user.data
    } catch (error) {
        return apiThunk.rejectWithValue('Cant added new user. something went wrong')
    }
})
export const updateUserStats = createAsyncThunk('user/addUpdatestoStats', async (data, apiThunk) => {
    const state = data.data;
    const id = data.id
    try {
        const user = await patchItems(`${url}${id}`, state)
        apiThunk.dispatch(addModalUser(user.data.updatedUser))
        return user.data
    } catch (error) {
        return apiThunk.rejectWithValue('Cant get ended contract something went wrong')
    }
})
export const widthrawAmountBookedUser = createAsyncThunk('user/addNewUser', async (data, apiThunk) => {
    try {
        const user = await postItems(`${url}/`, data)
        return user.data
    } catch (error) {
        return apiThunk.rejectWithValue('Cant get ended contract something went wrong')
    }
})


const userSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        clearState: (state) => {
            state = initialState
        },
        calUsers: (state) => {
            let openBooked = [], closeBooked = [];
            state.users.forEach(el => {
                if (el.active) openBooked.push(el)
                if (!el.active) closeBooked.push(el)
            })
            state.closeBooked = closeBooked;
            state.openBooked = openBooked;
            state.isOpenBooked = openBooked.length
            state.isCloseBooked = closeBooked.length
        }
    },
    extraReducers: {
        [getItemsUsers.pending]: (state) => {
            state.isLoading = true;
        },
        [getItemsUsers.fulfilled]: (state, action) => {
            state.isLoading = false;
            const { users } = action.payload
            state.users = [...users]
        },
        [endContracted.fulfilled]: (state, action) => {
            const { updatedUser } = action.payload
            const user = state.users.find(el => el.id === updatedUser.id)
            user.active = false;
        },
        [addNewUserBooked.fulfilled]: (state, action) => {
            const { user } = action.payload;
            state.users.push(user)
        },
        [updateUserStats.fulfilled]: (state, action) => {
            const { updatedUser } = action.payload;
            const { userStatus } = updatedUser;
            const user = state.users.find(el => el.id === updatedUser.id)
            user.userStatus = userStatus
        }
    }
})

export const { calUsers } = userSlice.actions

export default userSlice.reducer;