import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpenUserModal: false,
    isOpenNewUserModal: false,
    isOpenWidthrawForm: false,
    isOpenAddForm: false,
    userProfile: []
}

const userModalSlice = createSlice({
    name: 'user-modal',
    initialState: initialState,
    reducers: {
        addModalUser: (state, action) => {
            state.userProfile = action.payload
        },
        removeModalUser: (state) => {
            state.userProfile = []
        },
        openModalUser: (state) => {
            state.isOpenUserModal = true
        },
        closeModalUser: (state) => {
            state.isOpenUserModal = false
            state.isOpenAddForm = false
            state.isOpenWidthrawForm = false
        },
        openModalNewUser: (state) => {
            state.isOpenNewUserModal = true
        },
        closeModalNewUser: (state) => {
            state.isOpenNewUserModal = false
        },
        toogleWidthrawForm: (state) => {
            state.isOpenAddForm = false;
            state.isOpenWidthrawForm = !state.isOpenWidthrawForm
        },
        toogleAddForm: (state) => {
            state.isOpenAddForm = !state.isOpenAddForm;
            state.isOpenWidthrawForm = false
        }
    }
})

export const {
    openModalUser, openModalNewUser,
    closeModalUser, closeModalNewUser, addModalUser,
    removeModalUser, toogleAddForm, toogleWidthrawForm } = userModalSlice.actions;
export default userModalSlice.reducer;