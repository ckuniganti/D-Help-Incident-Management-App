import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./Component/Home";
import { defaultUser } from "./Util/Constants";
import Navigation from "./Component/Navigation";
import Login from "./Component/Login";
import User from "./CommonInterfaces/User";
import { UserProvider } from "./Context/UserContext";
import Profile from "./Component/Profile";

function App() {
  const [user, setUser] = useState<User>(defaultUser);
  useEffect(() => {
    // Function to get the user from local storage or use default
    const getUserFromLocalStorage = () => {
      const storedUser = localStorage.getItem("user");
      let user: User;
      if (storedUser) {
        try {
          // If user exists, parse it to a User object
          const parsedUser = JSON.parse(storedUser) as User;
          user = parsedUser;
        } catch (error) {
          console.error("Error parsing user from localStorage:", error);
          user = defaultUser;
        }
      } else {
        // If user is not available in localStorage, use the default value
        user = defaultUser;
      }
      console.log("%%%%%%%%%%%%%%%%%%%", user);
      return user;
    };

    // Get the user from local storage or use default
    const userFromStorage = getUserFromLocalStorage();
    setUser(userFromStorage);
    userCnxtHandler(userFromStorage);
  }, []);
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
          <Route
            path="/profile"
            element={
              sessionStorage.getItem("userToken") ? (
                <Profile />
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
