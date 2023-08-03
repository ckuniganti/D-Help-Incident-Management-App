import IncidentComponent from "./IncidentComponent";
import { defaultIncident } from "../Util/Constants";
import Incident from "../CommonInterfaces/Incident";
import User from "../CommonInterfaces/User";

interface IncidentsProp {
  incidentsHandler: (incidents: Incident[]) => void;
  userCnxtHandler: (user: User) => void;
  handleCloseModal: () => void;
}
const NewIncident = ({
  incidentsHandler,
  userCnxtHandler,
  handleCloseModal,
}: IncidentsProp) => {
  return (
    <IncidentComponent
      incident={defaultIncident}
      incHandler={incidentsHandler}
      userCnxtHandler={userCnxtHandler}
      handleCloseModal={handleCloseModal}
      mode="add"
    />
  );
};

export default NewIncident;
