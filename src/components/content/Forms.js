import React, { useContext } from "react";
import { getItems, patchItems } from '../helper/helper'
import { AppContexts } from '../../contexts/appContext'

const AddedForm = ({ id, setUser }) => {
    const { setData } = useContext(AppContexts)

    const [state, setState] = React.useState({
        add: true,
        widthraw: false,
        amount: '',
        bricks: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        async function fetchData() {
            const user = await patchItems(`https://qadir-bricks-company.herokuapp.com/api/v1/${id}`, state)

            setUser(user.data.updatedUser)
            if (user.status === 200) {
                setState({
                    add: true,
                    widthraw: false,
                    amount: '',
                    bricks: ''
                });

                const allData = await getItems('https://qadir-bricks-company.herokuapp.com/api/v1');
                setData(allData)

            }
        }
        fetchData()

    }
    const handleChange = (e) => {
        setState(prev => {
            return ({ ...prev, [e.target.name]: e.target.value })
        })
    }
    return (
        <form className='fromUserSubmit' onSubmit={(e) => handleSubmit(e)}>
            <h3>Add more quantites</h3>
            <label htmlFor="amount">Enter Amount</label>
            <input value={state.amount} onChange={(e) => handleChange(e)} type="number" id='amount' name='amount' required />
            <label htmlFor="bricks">Enter Bricks Quantity</label>
            <input value={state.bricks} onChange={(e) => handleChange(e)} type="number" id='bricks' name='bricks' required />
            <input type="submit" />
        </form>
    )
}


const WidthrawForm = ({ id, setUser }) => {
    const { setData } = useContext(AppContexts)

    const [state, setState] = React.useState({
        widthraw: true,
        add: false,
        amount: '',
        bricks: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        async function fetchData() {
            const user = await patchItems(`https://qadir-bricks-company.herokuapp.com/api/v1/${id}`, state)
            setUser(user.data.updatedUser)
            if (user.status === 200) {
                setState({
                    widthraw: true,
                    add: false,
                    amount: '',
                    bricks: ''
                });
                const allData = await getItems('https://qadir-bricks-company.herokuapp.com/api/v1');
                setData(allData)
            }
        }
        fetchData()

    }
    const handleChange = (e) => {
        setState(prev => {
            return ({ ...prev, [e.target.name]: e.target.value })
        })
    }
    return (
        <form className='fromUserSubmit' onSubmit={(e) => handleSubmit(e)}>
            <h3>How much quantites will be deduction</h3>
            <label htmlFor="amount">Enter Amount</label>
            <input value={state.amount} onChange={(e) => handleChange(e)} type="number" id='amount' name='amount' required />
            <label htmlFor="bricks">Enter Bricks Quantity</label>
            <input value={state.bricks} onChange={(e) => handleChange(e)} type="number" id='bricks' name='bricks' required />
            <input type="submit" />
        </form>
    )
}

export {
    AddedForm,
    WidthrawForm
}