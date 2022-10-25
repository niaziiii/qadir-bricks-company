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
    console.log('in use effect fun');
    async function loggedIn() { 
    console.log('is  logged in  fun');
      const user = await checkUserLogedIn(values) 
      console.log(user);
    }
    loggedIn()
    // eslint-disable-next-line
  }, [])

  console.log(authUser,'1');
  if (authUser === null) return (<LoadingAnimation />)
  console.log(authUser,'2');
  if (authUser === null) return (setTimeout(<LoadingAnimation />,10000))

  return (
    <div className="App"> <>{
      authUser ? <HomePage /> : <Login {...values} />
    } </>  </div>
  );
}

export default App;
