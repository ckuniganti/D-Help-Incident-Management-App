import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./Component/Home";
import { defaultUser } from "./Util/Constants";
import Navigation from "./Component/Navigation";
import Login from "./Component/Login";
import User from "./CommonInterfaces/User";
import { UserProvider } from "./Context/UserContext";

function App() {
  const [user, setUser] = useState<User>(defaultUser);

  const userCnxtHandler = (user: User) => {
    console.log("OnSuccessful Login setting the user context", user);
    setUser(user);
  };
  return (
    <>
      <UserProvider value={user}>
        <Navigation />
        <Routes>
          <Route
            path="/"
            element={<Login userCnxtHandler={userCnxtHandler} />}
          />
          <Route path="/home" element={<Home />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
