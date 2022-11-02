import React from "react"
import { FaUserAlt, FaUserCheck } from "react-icons/fa"
import AddNewPerson from "./newUser/AddNew"
import ShowProfile from "./UserProfile"
import { useSelector, useDispatch } from "react-redux"
import { openModalUser, openModalNewUser, addModalUser } from "./../../stateRedux/features/userModalSlice";


const Container = (prop) => {
    return (
        <div className="container">
            {prop.children}
        </div>
    )
}
const Statics = ({ active, closed }) => {
    return (
        <div className="homemenu">
            <div className="homemenu__left">
                <div className="total">
                    <h5>Total active persons</h5>
                    <h1>{active}</h1>
                </div>
            </div>
            <div className="homemenu__right">
                <div className="total">
                    <h5>Delivered completed</h5>
                    <h1>{closed}</h1>
                </div>
            </div>

        </div>
    )
}


const RenderUsers = ({ users }) => {
    const dispatch = useDispatch();
    return (
        <div className="homemenu-users">
            {users.map((el, i) => {
                return (
                    <div className="homemenu-users__user" key={i} onClick={(e) => {
                        dispatch(addModalUser(el))
                        dispatch(openModalUser())
                    }}>
                        <div>
                            {el.active ? <FaUserAlt /> : <FaUserCheck />}
                            <br />
                            <b>{el.name}</b>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

const Home = ({ refId }) => {
    const dispatch = useDispatch();
    const { users, userModal } = useSelector(store => store)
    const activePersons = [...users.openBooked].reverse()
    const deliverdPersons = [...users.closeBooked].reverse()

    return (
        <Container>
            {userModal.isOpenUserModal && <ShowProfile />}
            {userModal.isOpenNewUserModal && <AddNewPerson />}

            <div className="container__home">
                {refId === 'Home' && <>
                    <Statics active={users.isOpenBooked} closed={users.isCloseBooked} />
                    <div className="add-new-person">
                        <button onClick={() => dispatch(openModalNewUser())}>Add New Person</button>
                    </div>
                </>}
                {refId === 'Home' && <RenderUsers users={users.users.slice(0, 12)} />}
                {refId === 'Advance' && <RenderUsers users={activePersons} />}
                {refId === 'Closed' && <RenderUsers users={deliverdPersons} />}
            </div>
        </Container>
    )
}



export {
    Home
}
