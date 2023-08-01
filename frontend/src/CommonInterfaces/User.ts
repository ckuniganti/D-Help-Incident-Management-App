import Incident from "./Incident";

interface User {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  incidents: Incident[];
}

export default User;
