import Incident from "../CommonInterfaces/Incident";
import IncidentComponent from "./IncidentComponent";
import User from "../CommonInterfaces/User";

interface IncidentProps {
  incident: Incident;
  incidentsHandler: (incidents: Incident[]) => void;
  userCnxtHandler: (user: User) => void;
  handleCloseModal: () => void;
  alertMsgHandler: (msg: string) => void;
  handleOpenAlert: () => void;
}

const IncidentDetails = ({
  incident,
  incidentsHandler,
  userCnxtHandler,
  handleCloseModal,
  alertMsgHandler,
  handleOpenAlert,
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
          alertMsgHandler={alertMsgHandler}
          handleOpenAlert={handleOpenAlert}
        />
      </div>
    </>
  );
};

export default IncidentDetails;
