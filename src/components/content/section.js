import React from "react"
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
    const [show, setShow] = React.useState(false);
    const [id, setId] = React.useState(null);
    const [addPerson, setAddPerson] = React.useState(false)

    return (
        <Container>

            {show && <ShowProfile id={id} set={() => setShow(false)} />}
            {addPerson && <AddNewPerson set={() => setAddPerson(false)} />}
            <div className="container__home">
                <div className="homemenu">
                    <div className="homemenu__left">
                        <div className="total">
                            <h5>Total active persons</h5>
                            <h1>0</h1>
                        </div>
                    </div>
                    <div className="homemenu__right">
                        <div className="total">
                            <h5>Delivered completed</h5>
                            <h1>0</h1>
                        </div>
                    </div>

                </div>
                <div className="add-new-person">
                    <button onClick={() => setAddPerson(true)}>Add New Person</button>
                </div>
                <div className="homemenu-users">
                    {[0, 1, 1, 2, 2, 2].map((el, i) => {
                        return (
                            <div className="homemenu-users__user" data-id={i} key={i} onClick={(e) => {
                                const all = document.querySelectorAll('.homemenu-users__user')
                                setId(all[i].dataset.id)
                                setShow(true)
                            }}>
                                <div>
                                    <FaUserAlt />
                                    <br />
                                    <b>Ali Hassan Chak 582</b>
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
    const [show, setShow] = React.useState(false);
    const [id, setId] = React.useState(null);

    return (
        <Container>
            {show && <ShowProfile id={id} set={() => setShow(false)} />}
            <div className="container__buyer">
                <div className="buyermenu">
                    <div className="buyermenu-users">
                        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1].map((el, i) => {
                            return (
                                <div className="buyermenu-users__user" key={i} data-id={i} onClick={(e) => {
                                    const all = document.querySelectorAll('.buyermenu-users__user')
                                    setId(all[i].dataset.id)
                                    setShow(true)
                                }}>
                                    <div>
                                        <FaUserAlt />
                                        <br />
                                        <b>Ali Hassan Chak 582</b>
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
    const [show, setShow] = React.useState(false);
    const [id, setId] = React.useState(null);

    return (
        <Container>
            {show && <ShowProfile id={id} set={() => setShow(false)} end={true} />}
            <div className="container__delivered">
                <div className="deliverdmenu">
                    <div className="deliverdmenu-users">
                        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1].map((el, i) => {
                            return (
                                <div className="deliverdmenu-users__user" key={i} data-id={i} onClick={(e) => {
                                    const all = document.querySelectorAll('.deliverdmenu-users__user')
                                    setId(all[i].dataset.id)
                                    setShow(true)
                                }}>
                                    <div>
                                        <FaUserCheck />
                                        <br />
                                        <b>Ali Hassan Chak 582</b>
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
