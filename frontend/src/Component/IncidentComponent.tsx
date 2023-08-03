import Incident from "../CommonInterfaces/Incident";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SaveIncidentRequest from "../CommonInterfaces/SaveIncidentRequest";
import UserContext from "../Context/UserContext";
import { TextField, Box, Button, Container } from "@mui/material";
import { getIncidentNumber } from "../Util/helper";
import User from "../CommonInterfaces/User";
interface IncidentProps {
  incident: Incident;
  incHandler: (incidents: Incident[]) => void;
  userCnxtHandler: (user: User) => void;
  handleCloseModal: () => void;
  mode: string;
}
const IncidentComponent = ({
  incident,
  incHandler,
  userCnxtHandler,
  handleCloseModal,
  mode,
}: IncidentProps) => {
  const userCnxt = useContext(UserContext);

  const replaceIncident = (data: Incident) => {
    let updatedIncidents: Incident[];
    if (mode === "add") {
      updatedIncidents = [...userCnxt.incidents];
      console.log("updated Incidents", updatedIncidents);
      console.log("data to be pushed", data);
      updatedIncidents.push(data);
    } else {
      updatedIncidents = userCnxt.incidents.map((inc) =>
        inc.incidentID === data.incidentID ? data : inc
      );
    }
    incHandler(updatedIncidents);
    const user: User = { ...userCnxt, incidents: updatedIncidents };
    userCnxtHandler(user);
  };
  const { handleSubmit, register, reset } = useForm<Incident>();
  const onSaveHandler = (data: Incident) => {
    const request: SaveIncidentRequest = {
      userName: userCnxt.userName,
      incident: { ...data, requestedBy: userCnxt.userName },
    };
    console.log("Data from Incident Form", request);
    let url = "http://localhost:8080/users/user/incident/";
    if (mode === "add") {
      url = url + "add";
    } else {
      url = url + "update";
    }
    axios
      .post(url, request)
      .then((response) => {
        replaceIncident({ ...data, requestedBy: userCnxt.userName });
      })
      .catch((error) => {
        console.log("Error occurred:", error);
      });
    handleCloseModal();
  };

  const onCancelHandler = () => {
    reset(incident);
    handleCloseModal();
  };

  return (
    <form
      onSubmit={handleSubmit(onSaveHandler)}
      style={{ width: 550, textAlign: "center", margin: 0 }}
    >
      <p>Incident Details for {incident.incidentID}</p>
      <Container maxWidth="sm">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
        >
          <TextField
            id="incidentID"
            label="IncidentID"
            variant="outlined"
            defaultValue={
              incident.incidentID === ""
                ? getIncidentNumber()
                : incident.incidentID
            }
            {...register("incidentID")}
          />
          <TextField
            id="requestedFor"
            label="RequestedFor"
            defaultValue={
              incident.requestedFor === ""
                ? userCnxt.userName
                : incident.requestedFor
            }
            {...register("requestedFor")}
          />
          <TextField
            type="date"
            id="effectiveDate"
            label="EffectiveDate"
            defaultValue={incident.effectiveDate}
            {...register("effectiveDate")}
          />
          <TextField
            type="text"
            id="environmentType"
            label="Environment Type"
            defaultValue={incident.environmentType}
            {...register("environmentType")}
          />
          <TextField
            type="text"
            id="application"
            label="Application"
            defaultValue={incident.application}
            {...register("application")}
          />
          <TextField
            id="status"
            label="Status"
            defaultValue={incident.status}
            {...register("status")}
          />
          <TextField
            type="text"
            id="description"
            label="Description"
            defaultValue={incident.description}
            {...register("description")}
            multiline
          />
          <TextField
            type="date"
            id="createdTime"
            label="Created Date"
            defaultValue={incident.createdTime}
            {...register("createdTime")}
          />
          <TextField
            id="updatedBy"
            label="Updated By"
            defaultValue={
              incident.updatedBy === "" ? userCnxt.userName : incident.updatedBy
            }
            {...register("updatedBy")}
          />
          <TextField
            type="date"
            id="updatedTime"
            label="Updated Time"
            defaultValue={incident.updatedTime}
            {...register("updatedTime")}
          />
        </Box>
      </Container>
      <Box sx={{ width: 550, textAlign: "center" }}>
        <Button sx={{ width: 150, m: 1 }} variant="contained" type="submit">
          Save
        </Button>
        <Button
          sx={{ width: 150, m: 1 }}
          variant="contained"
          onClick={onCancelHandler}
        >
          Cancel
        </Button>
      </Box>
    </form>
  );
};

export default IncidentComponent;
