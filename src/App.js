import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HomePage, Login } from "./components";
import LoadingAnimation from "./components/loadingAnimation/LoadingAnimation";
import { LoggedInUserCheck } from "./stateRedux/features/adminSlice";
import { calUsers } from "./stateRedux/features/usersSlice";

function App() {
  const dispatch = useDispatch()
  const { users, admin } = useSelector(store => store);
  const { isLoading, isLoggedIn } = admin;

  useEffect(() => {
    (()=>{dispatch(LoggedInUserCheck())})()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    dispatch(calUsers())
    // eslint-disable-next-line
  }, [users.users])

  if (isLoading) return (<LoadingAnimation />)

  return (
    <div className="App"> <>{
      isLoggedIn ? <HomePage /> : <Login />
    } </>  </div>
  );
}

export default App;
