import React from 'react'
import { FaUserAlt } from "react-icons/fa"
import { AiOutlineArrowDown,AiOutlineArrowUp } from "react-icons/ai"

import { GrFormClose } from 'react-icons/gr'
import { AddRemoveForm } from './Forms'
import { closeModalUser, removeModalUser, toogleWidthrawForm, toogleAddForm } from '../../stateRedux/features/userModalSlice'
import { useDispatch, useSelector } from 'react-redux'
import { endContracted } from '../../stateRedux/features/usersSlice'


const genLists = (arr) => {
    return arr.map((el, i) => {
        return (<li key={i}>
            <h4 className={`main-list-${el.add ? "remove" : "add"}`}><b >{el.widthraw ? "Removed" : "Added"}</b></h4>
            <h4>{el.amount}</h4>
            <h4>{el.bricks}</h4>
            <h4>{new Date(el.date).toLocaleDateString("en-US")}</h4>
        </li>)
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


const ShowProfile = () => {
    const dispatch = useDispatch()
    const { userProfile, isOpenAddForm, isOpenWidthrawForm } = useSelector(store => store.userModal)

    return (
        userProfile &&
        <div className="User-profile-container">
            <div className="profile">
                <div className="profile__container">
                    <button className="close-btn" onClick={() => {
                        dispatch(closeModalUser())
                        dispatch(removeModalUser())
                    }}><GrFormClose /></button>
                    <div className="profile__heading">
                        <span className="user-profile">
                            <i><FaUserAlt /></i>
                            <p>{userProfile.name}</p>
                            <p>address <b>{userProfile.address}</b></p>
                            <p>Contact <b>{userProfile.number}</b></p>
                        </span>
                        <span>
                            <h2>
                            <p><b>Amount available : {userProfile.amount}</b></p>
                            <p><b>Bricks available : {userProfile.bricks}</b></p>
                            </h2>
                        </span>

                    </div>
                    {userProfile.active ?
                        <div className="profile__btns">
                            <button onClick={() => dispatch(toogleAddForm())}>Added {isOpenAddForm? <AiOutlineArrowUp/>: <AiOutlineArrowDown/>}</button>
                            <button onClick={() => dispatch(toogleWidthrawForm())}>Widthraws {isOpenWidthrawForm? <AiOutlineArrowUp/>: <AiOutlineArrowDown/>}</button>
                        </div>
                        : ''
                    }
                    {isOpenAddForm && <AddRemoveForm id={userProfile.id} refId={'Add'} />}
                    {isOpenWidthrawForm && <AddRemoveForm id={userProfile.id} />}
                    <div className="profile__content">
                        <ul>

                            <li className='main-list'>
                                <h4>Type</h4>
                                <h4>Amount</h4>
                                <h4>Bricks</h4>
                                <h4>Date</h4>
                            </li>
                            {genLists(reverse(userProfile.userStatus))}

                        </ul>
                    </div>
                    <div className="end-contract-btn">
                        {userProfile.active ?
                            <button onClick={() => dispatch(endContracted(userProfile.id))}>End Contract</button>
                            : <button style={{ background: 'black', color: 'white' }}>Already Ended</button>
                        }
                    </div>

                </div>
            </div>
        </div>)
}

export default ShowProfile
