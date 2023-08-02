import IncidentComponent from "./IncidentComponent";
import { defaultIncident } from "../Util/Constants";
import Incident from "../CommonInterfaces/Incident";
import User from "../CommonInterfaces/User";

interface IncidentsProp {
  incidentsHandler: (incidents: Incident[]) => void;
  userCnxtHandler: (user: User) => void;
}
const NewIncident = ({ incidentsHandler, userCnxtHandler }: IncidentsProp) => {
  return (
    <>
      <div>
        <IncidentComponent
          incident={defaultIncident}
          incHandler={incidentsHandler}
          userCnxtHandler={userCnxtHandler}
          mode="add"
        />
      </div>
    </>
  );
};

export default NewIncident;
