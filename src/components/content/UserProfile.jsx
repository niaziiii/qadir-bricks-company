import React from 'react'
import { FaUserAlt } from "react-icons/fa"

import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { GrFormClose } from 'react-icons/gr'
import { GrCurrency } from 'react-icons/gr'

import { AddRemoveForm } from './Forms'
import { closeModalUser, removeModalUser, toogleWidthrawForm, toogleAddForm } from '../../stateRedux/features/userModalSlice'
import { useDispatch, useSelector } from 'react-redux'
import { endContracted } from '../../stateRedux/features/usersSlice'


const genLists = (arr) => {
    return arr.map((el, i) => {
        return (<li key={i}>
            <h4 className={`main-list-${el.add ? "remove" : "add"}`}><b >{el.widthraw ? "Removed" : "Added"}</b></h4>
            <h4><GrCurrency /> {el.amount} </h4>
            <h4>🧱 {el.bricks} </h4>
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
                            <div className='user-profile-details'>
                                <button><b>Name</b> <p>{userProfile.name}</p></button>
                                <button><b>Address</b> <p>{userProfile.address}</p></button>
                                <button><b>Contact</b> <p>{userProfile.number}</p></button>
                            </div>

                        </span>
                        <span>
                            <div className='user-profile-details'>
                                <button><b>Amount available 💲</b> <p>{userProfile.amount}</p></button>
                                <button><b>Bricks available 🧱</b> <p>{userProfile.bricks}</p></button>
                            </div>
                        </span>

                    </div>
                    {userProfile.active ?
                        <div className="profile__btns">
                            <button onClick={() => dispatch(toogleAddForm())}>Added {isOpenAddForm ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</button>
                            <button onClick={() => dispatch(toogleWidthrawForm())}>Widthraws {isOpenWidthrawForm ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</button>
                        </div>
                        : ''
                    }
                    {isOpenAddForm && <AddRemoveForm id={userProfile.id} refId={'Add'} />}
                    {isOpenWidthrawForm && <AddRemoveForm id={userProfile.id} refId={'remove'} />}
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
