import Incident from "../CommonInterfaces/Incident";
import IncidentComponent from "./IncidentComponent";
import User from "../CommonInterfaces/User";

interface IncidentProps {
  incident: Incident;
  incidentsHandler: (incidents: Incident[]) => void;
  userCnxtHandler: (user: User) => void;
  handleCloseModal: () => void;
}

const IncidentDetails = ({
  incident,
  incidentsHandler,
  userCnxtHandler,
  handleCloseModal,
}: IncidentProps) => {
  return (
    <>
      <div>
        <IncidentComponent
          incident={incident}
          incHandler={incidentsHandler}
          userCnxtHandler={userCnxtHandler}
          handleCloseModal={handleCloseModal}
          mode="edit"
        />
      </div>
    </>
  );
};

export default IncidentDetails;
