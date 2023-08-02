import Incident from "./Incident";

interface User {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  title: string;
  costCenter: string;
  location: string;
  contactNumber: string;
  contactEmail: string;
  incidents: Incident[];
}

export default User;
