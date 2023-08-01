import IncidentComponent from "./IncidentComponent";
import { defaultIncident } from "../Util/Constants";
const NewIncident = () => {
  return (
    <>
      <div>
        <IncidentComponent incident={defaultIncident} mode="add" />
      </div>
    </>
  );
};

export default NewIncident;
