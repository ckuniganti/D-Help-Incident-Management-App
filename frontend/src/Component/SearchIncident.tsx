import { useForm } from "react-hook-form";
import IncidentInputs from "../CommonInterfaces/IncidentInputs";
import axios from "axios";
import { useState, useContext } from "react";
import Incident from "../CommonInterfaces/Incident";
//import UserContext from "../Context/UserContext";
import IncidentComponent from "./IncidentComponent";
interface incidentHanlerProp {
  incHandler: (incident: Incident) => void;
}
const SearchIncident = ({ incHandler }: incidentHanlerProp) => {
  //const userCnxt = useContext(UserContext);
  const [incident, setIncident] = useState<Incident | undefined>(undefined);
  const { handleSubmit, reset, register } = useForm<IncidentInputs>();
  const onSubmitHandler = (data: IncidentInputs) => {
    axios
      .post("http://localhost:8080/users/user/incident", data)
      .then((response) => {
        console.log("************* response data***********", response.data);
        if (response.data && response.data.incident) {
          setIncident(response.data.incident);
          incHandler(response.data.incident);
        }
        console.log("************* Incident ***********", incident);
      })
      .catch((error) => {
        console.log("Error occurred:", error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <label>User Name</label>
        <input
          type="text"
          id="userName"
          //defaultValue={userCnxt}
          contentEditable={false}
          {...register("userName")}
        />
        <label>Incident ID</label>
        <input type="text" id="incidentID" {...register("incidentID")} />
        <button type="submit">fetch Incident</button>
        <button
          onClick={() => {
            reset();
            setIncident(undefined);
          }}
        >
          reset
        </button>
      </form>
      {/* {incident && <IncidentComponent incident={incident} mode="edit" />} */}
    </>
  );
};

export default SearchIncident;
