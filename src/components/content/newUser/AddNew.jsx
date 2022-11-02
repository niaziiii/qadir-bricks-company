import React from "react";
import './AddNew.scss'
import { GrFormClose } from 'react-icons/gr'
import { useDispatch } from "react-redux";
import { closeModalNewUser } from "../../../stateRedux/features/userModalSlice";
import { addNewUserBooked } from "../../../stateRedux/features/usersSlice";

const formitObj = {
    address: "",
    amount: "",
    bricks: "",
    name: "",
    number: ""
}

const AddNewPerson = ({ set }) => {
    const dispatch = useDispatch();    
    const [state, setState] = React.useState(formitObj)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addNewUserBooked(state))
    }

    const handleChange = (e) => {
        setState(prev => {
            return ({
                ...prev,
                [e.target.name]: e.target.value
            })
        })

    }
    return (
        <div className="addnewperson">
            <div className="addnewperson__container">
                <button className="close-btn-add" onClick={() => dispatch(closeModalNewUser())}><GrFormClose /></button>
                <form onSubmit={(e) => handleSubmit(e)}>

                    <h3>Add New Person</h3>
                    <label htmlFor="name">Enter Person Name</label>
                    <input value={state.name} onChange={e => handleChange(e)} required type='text' id='name' name="name" />
                    <label htmlFor="address">Enter Person Address</label>
                    <input value={state.address}  onChange={e => handleChange(e)} required type='text' id='address' name="address" />
                    <label htmlFor="number">Enter Person Number</label>
                    <input value={state.number}  onChange={e => handleChange(e)} required type='text' id='number' name="number" />
                    <label htmlFor="amount">Enter Net Amount</label>
                    <input value={state.amount}  onChange={e => handleChange(e)} required type='number' id='amount' name="amount" />
                    <label htmlFor="bricks">Enter Bricks Quantity</label>
                    <input value={state.bricks}  onChange={e => handleChange(e)} required type='number' id='bricks' name="bricks" />
                    <input type='submit' />
                </form>
            </div>
        </div>
    )
}

export default AddNewPerson