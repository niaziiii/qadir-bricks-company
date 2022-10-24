import React, { useContext } from "react"
import { AppContexts } from '../../contexts/appContext'

import { FaUserAlt, FaUserCheck } from "react-icons/fa"
import AddNewPerson from "./newUser/AddNew"
import ShowProfile from "./UserProfile"

const Container = (prop) => {
    return (
        <div className="container">
            {prop.children}
        </div>
    )
}


const Home = () => {
    const { data } = useContext(AppContexts)
    const activePersons = data.users.filter(el => el.active === true).reverse()
    const deliverdPersons = data.users.filter(el => el.active === false)

    const [show, setShow] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const [addPerson, setAddPerson] = React.useState(false)

    return (
        <Container>
            {show && <ShowProfile userData={user} set={() => setShow(false)} />}
            {addPerson && <AddNewPerson set={() => setAddPerson(false)} />}
            <div className="container__home">
                <div className="homemenu">
                    <div className="homemenu__left">
                        <div className="total">
                            <h5>Total active persons</h5>
                            <h1>{activePersons.length}</h1>
                        </div>
                    </div>
                    <div className="homemenu__right">
                        <div className="total">
                            <h5>Delivered completed</h5>
                            <h1>{deliverdPersons.length}</h1>
                        </div>
                    </div>

                </div>
                <div className="add-new-person">
                    <button onClick={() => setAddPerson(true)}>Add New Person</button>
                </div>
                <div className="homemenu-users">
                    {activePersons.map((el, i) => {
                        if (i > 8) return ''
                        return (
                            <div className="homemenu-users__user" key={i} onClick={(e) => {
                                setUser(el)
                                setShow(true)
                            }}>
                                <div>
                                    <FaUserAlt />
                                    <br />
                                    <b>{el.name}</b>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </Container>
    )
}

const Buyer = () => {
    const { data } = useContext(AppContexts)
    const [show, setShow] = React.useState(false);
    const activePersons = data.users.filter(el => el.active === true).reverse()
    const [user, setUser] = React.useState(null);

    return (
        <Container>
            {show && <ShowProfile userData={user} set={() => setShow(false)} />}

            <div className="container__buyer">
                <div className="buyermenu">
                    <div className="buyermenu-users">
                        {activePersons.map((el, i) => {
                            return (
                                <div className="buyermenu-users__user" key={i} onClick={(e) => {
                                    setUser(el)
                                    setShow(true)
                                }}>
                                    <div>
                                        <FaUserAlt />
                                        <br />
                                        <b>{el.name}</b>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Container>
    )
}
const Deliverd = () => {
    const { data } = useContext(AppContexts)
    const [show, setShow] = React.useState(false);
    const [user, setUser] = React.useState(null);

    const deliverdPersons = data.users.filter(el => el.active === false).reverse()


    return (
        <Container>

            {show && <ShowProfile userData={user} set={() => setShow(false)} end={true} />}
            <div className="container__delivered">
                <div className="deliverdmenu">
                    <div className="deliverdmenu-users">
                        {deliverdPersons.map((el, i) => {
                            return (
                                <div className="deliverdmenu-users__user" key={i} onClick={(e) => {
                                    setUser(el)
                                    setShow(true)
                                }}>
                                    <div>
                                        <FaUserCheck />
                                        <br />
                                        <b>{el.name}</b>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Container>
    )
}



export {
    Home,
    Buyer,
    Deliverd
}
