import React, { useState, useContext } from 'react'
import { FaUserAlt } from "react-icons/fa"
import { GrFormClose } from 'react-icons/gr'
import { AddedForm, WidthrawForm } from './Forms'
import { AppContexts } from '../../contexts/appContext'
import { patchItems, getItems } from '../helper/helper'

const genLists = (arr) => {
    return arr.map((el, i) => {
        return (<li key={i} style={el.add === true && el.widthraw === false ? { background: '#7D6E83' } : { background: '#D2001A' }}>
            Mr, Abdul Qadir {el.add === true && el.widthraw === false && 'added'}
            {el.add === false && el.widthraw === true && 'removes'}
            &nbsp;the {el.amount} amount and {el.bricks} bricks on {new Date(el.date).toLocaleDateString("en-US")}</li>)
    })
}

function reverse(array) {
    var output = [],
        i;
    for (i = 0; i < array.length; i++) {
        output.unshift(array[i]);
    }
    return output;
}

async function endContract(id, setUser, setData) {
    const item = await patchItems(`https://qadir-bricks-company.herokuapp.com/api/v1/${id}`, {
        active: false
    })
    if (item.status !== 200) return
    setUser(item.data.updatedUser)
    const allData = await getItems('https://qadir-bricks-company.herokuapp.com/api/v1');
    setData(allData)
}





const ShowProfile = ({ userData, set, end }) => {
    const [addForm, setAddForm] = React.useState(false)
    const [widthrawForm, setWidthrawForm] = React.useState(false)
    const [user, setUser] = useState(userData)
    const { setData } = useContext(AppContexts)
    const toogleAddform = () => {
        setWidthrawForm(false)
        setAddForm((prev) => !prev)
    }

    const toogleWidthrawform = () => {
        setAddForm(false)
        setWidthrawForm((prev) => !prev)
    }
    return (
        user &&
        <div className="User-profile-container">
            <div className="profile">
                <div className="profile__container">
                    <button className="close-btn" onClick={() => set()}><GrFormClose /></button>
                    <div className="profile__heading">
                        <span className="user-profile">
                            <i><FaUserAlt /></i>
                            <p>{user.name}</p>
                            <p>address <b>{user.address}</b></p>
                            <p>Contact <b>{user.number}</b></p>
                        </span>
                        <span>
                            <p><b>Amount available : {user.amount}</b></p>
                            <p><b>Bricks available : {user.bricks}</b></p>
                        </span>

                    </div>
                    {user.active ?
                        <div className="profile__btns">
                            <button onClick={() => toogleAddform()}>Added</button>
                            <button onClick={() => toogleWidthrawform()}>Widthraws</button>
                        </div>
                        :'' 
                    }
                    {addForm && <AddedForm id={user.id} setUser={setUser} />}
                    {widthrawForm && <WidthrawForm id={user.id} setUser={setUser} />}
                    <div className="profile__content">
                        <ul>

                            {genLists(reverse(user.userStatus))}

                        </ul>
                    </div>
                    <div className="end-contract-btn">
                        {user.active ?
                            <button onClick={(e) => {
                                e.preventDefault()
                                endContract(user.id, setUser, setData)
                            }}>End Contract</button>
                            : <button style={{ background: 'black', color: 'white' }}>Already Ended</button>
                        }
                    </div>

                </div>
            </div>
        </div>)
}

export default ShowProfile
