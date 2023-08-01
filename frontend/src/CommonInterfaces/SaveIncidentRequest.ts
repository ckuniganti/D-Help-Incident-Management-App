import Incident from "./Incident";

interface SaveIncidentRequest {
  userName: string;
  incident: Incident;
}

export default SaveIncidentRequest;
