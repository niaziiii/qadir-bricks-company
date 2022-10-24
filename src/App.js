import React from "react";
import { HomePage, Login } from "./components";

function App() {
  const [user, setUser] = React.useState(null)
  const [authUser, setAuthUser] = React.useState(false)
  const values = {
    user,
    setUser,
    authUser,
    setAuthUser
  }
  return (
    <div className="App"> <>{
      authUser ? <HomePage /> : <Login {...values} />
    } </>  </div>
  );
}

export default App;
