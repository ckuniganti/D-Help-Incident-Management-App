import Incident from "../CommonInterfaces/Incident";
import User from "../CommonInterfaces/User";
import { getDateOnlyInString } from "./helper";
const defaultIncident: Incident = {
  incidentID: "",
  requestedBy: "",
  requestedFor: "",
  effectiveDate: getDateOnlyInString(new Date()),
  environmentType: "",
  application: "",
  description: "",
  createdTime: getDateOnlyInString(new Date()),
  updatedBy: "",
  updatedTime: getDateOnlyInString(new Date()),
  status: "",
  environment: "",
};

const defaultUser: User = {
  userName: "",
  password: "",
  firstName: "",
  lastName: "",
  title: "",
  costCenter: "",
  location: "",
  contactNumber: "",
  contactEmail: "",
  incidents: [],
};

export { defaultIncident, defaultUser };
