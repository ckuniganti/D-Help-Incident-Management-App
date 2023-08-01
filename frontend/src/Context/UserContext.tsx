import React from "react";
import User from "../CommonInterfaces/User";
import {defaultUser} from '../Util/Constants'

const UserContext = React.createContext<User>(defaultUser);

const UserProvider = UserContext.Provider;

export { UserProvider };

export default UserContext;
