import React from "react";
import Incident from "../CommonInterfaces/Incident";
import { defaultIncident } from "../Util/Constants";
const IncidentContext = React.createContext<Incident>(defaultIncident);

const IncidentProvider = IncidentContext.Provider;

export { IncidentProvider };

export default IncidentContext;
