import React from "react";
import { useDispatch } from "react-redux";
import { updateUserStats } from "../../stateRedux/features/usersSlice";

const addState = {
    add: true,
    widthraw: false,
    amount: '',
    bricks: ''
}
const widthrawState = {
    widthraw: true,
    add: false,
    amount: '',
    bricks: ''
}
const AddRemoveForm = ({ id, refId }) => {
    const dispatch = useDispatch()
    const [btn, setBtn] = React.useState('Submit Request')
    const [state, setState] = React.useState(refId === 'Add' ? addState : widthrawState);

    const handleSubmit = (e) => {
        setBtn('Submiting...')
        e.preventDefault();
        if (btn === 'Submiting...') return
        dispatch(updateUserStats({ data: state, id: id }))
        setBtn('Submited')
        setState(addState)
    }
    const handleChange = (e) => {
        setState(prev => {
            return ({ ...prev, [e.target.name]: e.target.value })
        })
    }
    return (
        <form className='fromUserSubmit' onSubmit={(e) => handleSubmit(e)}>
            {refId === 'Add' ? <h3>Add more...</h3> : <h3>Remove more...</h3>}
            <label htmlFor="amount">Enter Amount</label>
            <input value={state.amount} onChange={(e) => handleChange(e)} type="number" id='amount' name='amount' required />
            <label htmlFor="bricks">Enter Bricks Quantity</label>
            <input value={state.bricks} onChange={(e) => handleChange(e)} type="number" id='bricks' name='bricks' required />
            <input type="submit" value={btn} />
        </form>
    )
}




export {
    AddRemoveForm
}