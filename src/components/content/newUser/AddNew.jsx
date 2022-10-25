import React,{useContext} from "react";
import './AddNew.scss'
import { GrFormClose } from 'react-icons/gr'
import { postItems,getItems } from "../../helper/helper";
import { AppContexts } from '../../../contexts/appContext'


const formitObj = {
    address: "",
    amount: "",
    bricks: "",
    name: "",
    number: ""
}

const AddNewPerson = ({ set }) => {
    const { setData } = useContext(AppContexts)
    
    const [state, setState] = React.useState(formitObj)
    const handleSubmit = (e) => {
        e.preventDefault()
       async function addNewUser() {
            const data = await postItems('https://qadir-bricks-company.herokuapp.com/api/v1',state)
            setState(formitObj)
            if(!data.status===201) return;
            const allData = await getItems('https://qadir-bricks-company.herokuapp.com/api/v1');
            setData(allData)
            set()
        }
        addNewUser()
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
                <button className="close-btn-add" onClick={() => set()}><GrFormClose /></button>
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