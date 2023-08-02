import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "./Component/Home";
import { defaultUser } from "./Util/Constants";
import Navigation from "./Component/Navigation";
import Login from "./Component/Login";
import User from "./CommonInterfaces/User";
import { UserProvider } from "./Context/UserContext";

function App() {
  const [user, setUser] = useState<User>(defaultUser);
  const [login, setLogin] = useState<boolean>(false);

  const userCnxtHandler = (user: User) => {
    console.log("OnSuccessful Login setting the user context", user);
    setUser(user);
  };
  const authenticationHandler = (isLogin: boolean) => {
    setLogin(isLogin);
  };
  return (
    <>
      <UserProvider value={user}>
        <Navigation authHandler={authenticationHandler} />
        <Routes>
          <Route
            path="/"
            element={
              <Login
                userCnxtHandler={userCnxtHandler}
                authHandler={authenticationHandler}
              />
            }
          />
          <Route
            path="/home"
            element={
              sessionStorage.getItem("userToken") ? (
                <Home userCnxtHandler={userCnxtHandler} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
