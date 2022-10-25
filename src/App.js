import React, { useEffect } from "react";
import { HomePage, Login } from "./components";
import { checkUserLogedIn } from "./components/helper/userLoggedIn";
import LoadingAnimation from "./components/loadingAnimation/LoadingAnimation";

function App() {
  const [authUser, setAuthUser] = React.useState(null)
  const values = {
    authUser,
    setAuthUser
  }
  useEffect(() => {
    async function loggedIn() { await checkUserLogedIn(values) }
    return () => loggedIn()
    // eslint-disable-next-line
  }, [])

  if (authUser === null) return (<LoadingAnimation />)

  return (
    <div className="App"> <>{
      authUser ? <HomePage /> : <Login {...values} />
    } </>  </div>
  );
}

export default App;
