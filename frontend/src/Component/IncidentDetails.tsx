import Incident from "../CommonInterfaces/Incident";
import IncidentComponent from "./IncidentComponent";

interface IncidentProps {
  incident: Incident;
}

const IncidentDetails = ({ incident }: IncidentProps) => {
  return (
    <>
      <div>
        <IncidentComponent incident={incident} mode="edit" />
      </div>
    </>
  );
};

export default IncidentDetails;
