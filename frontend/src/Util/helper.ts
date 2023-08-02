import axios from "axios";

const getDateOnlyInString = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

const getIncidentNumber = () => {
  let incidentNumber = "";
  axios
    .get("http://localhost:8080/users/getIncidentNumber")
    .then((response) => {
      incidentNumber = response.data;
      console.log(incidentNumber);
    });

  return incidentNumber;
};

export { getDateOnlyInString, getIncidentNumber };
