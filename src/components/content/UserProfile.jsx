import React from 'react'
import { FaUserAlt } from "react-icons/fa"
import { GrFormClose } from 'react-icons/gr'



const genLists = (arr) => {
    return arr.map((el, i) => {
        return (<li key={i} style={el.add === true && el.widthraw === false ? { background: '#7D6E83' } : { background: '#D2001A' }}>
            Mr, Abdul Qadir {el.add === true && el.widthraw === false && 'added'}
            {el.add === false && el.widthraw === true && 'widthraws'}
            &nbsp;the {el.amount} amount and {el.bricks} bricks on {el.date}</li>)
    })
}
const AddedForm = () => {
    const [state, setState] = React.useState({
        add: true,
        amount: '',
        bricks: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(state);
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


const WidthrawForm = () => {
    const [state, setState] = React.useState({
        widthraw: true,
        amount: '',
        bricks: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(state);
        setState({
            widthraw: true,
            amount: '',
            bricks: ''
        })
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

const fake = [
    {
        amount: '500',
        bricks: '400',
        date: '12-5-7',
        add: true,
        widthraw: false,
    },
    {
        amount: '500',
        bricks: '400',
        date: '12-5-7',
        add: false,
        widthraw: true,
    },
    {
        amount: '500',
        bricks: '400',
        date: '12-5-7',
        add: true,
        widthraw: false,
    },
    {
        amount: '500',
        bricks: '400',
        date: '12-5-7',
        add: true,
        widthraw: false,
    },
    {
        amount: '500',
        bricks: '400',
        date: '12-5-7',
        add: true,
        widthraw: false,
    },
]
const ShowProfile = ({ id, set, end }) => {
    const [addForm, setAddForm] = React.useState(false)
    const [widthrawForm, setWidthrawForm] = React.useState(false)

    const toogleAddform = () => {
        setWidthrawForm(false)
        setAddForm((prev) => !prev)
    }

    const toogleWidthrawform = () => {
        setAddForm(false)
        setWidthrawForm((prev) => !prev)
    }
    return (
        <div className="User-profile-container">

            <div className="profile">
                <div className="profile__container">
                    <button className="close-btn" onClick={() => set()}><GrFormClose /></button>
                    <div className="profile__heading">
                        <span className="user-profile">
                            <i><FaUserAlt /></i>
                            <p>Ali Hassan Chak 566 aodkdj</p>
                            <p>address <b>Dhola arain, duniya pur</b></p>
                            <p>Contact <b>03069383843</b></p>
                        </span>
                        <span>
                            <p><b>Amount available : {id}</b></p>
                            <p><b>Bricks available : {id}</b></p>
                        </span>

                    </div>
                    {end ? '' :
                        <div className="profile__btns">
                            <button onClick={() => toogleAddform()}>Added</button>
                            <button onClick={() => toogleWidthrawform()}>Widthraws</button>
                        </div>
                    }
                    {addForm && <AddedForm />}
                    {widthrawForm && <WidthrawForm />}
                    <div className="profile__content">
                        <ul>
                            {genLists(fake)}

                        </ul>
                    </div>
                    <div className="end-contract-btn">
                        {end ? <button>Already Ended</button> :
                            <button>End Contract</button>}

                    </div>

                </div>
            </div>
        </div>)
}

export default ShowProfile
