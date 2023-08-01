import Incident from "../CommonInterfaces/Incident";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SaveIncidentRequest from "../CommonInterfaces/SaveIncidentRequest";
import UserContext from "../Context/UserContext";
import { TextField, Box, Button, Container } from "@mui/material";
interface IncidentProps {
  incident: Incident;
  mode: string;
}
const IncidentComponent = ({ incident, mode }: IncidentProps) => {
  const userCnxt = useContext(UserContext);
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState<boolean>(
    mode === "add" ? true : false
  );

  const { handleSubmit, register, reset } = useForm<Incident>();
  const onSaveHandler = (data: Incident) => {
    const request: SaveIncidentRequest = {
      userName: data.requestedFor,
      incident: data,
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
        console.log("************* response data***********", response.data);
        setIsEditable(false);
        if (mode === "add") {
          navigate("/home");
        }
      })
      .catch((error) => {
        console.log("Error occurred:", error);
      });
  };
  const onEditHandler = () => {
    console.log("Edit Called!!!");
    setIsEditable(true);
  };
  const onCancelHandler = () => {
    console.log("Cancel Called!!!");
    setIsEditable(false);
    if (mode === "add") {
      navigate("/home");
    } else {
      reset(incident);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSaveHandler)}>
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
              disabled
              value={incident.incidentID}
              {...register("incidentID")}
            />
            <TextField
              id="requestedBy"
              label="RequestedBy"
              defaultValue={
                incident.requestedBy === ""
                  ? userCnxt.userName
                  : incident.requestedBy
              }
              {...register("requestedBy")}
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
                incident.updatedBy === ""
                  ? userCnxt.userName
                  : incident.updatedBy
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
        <p>
          {isEditable && <Button type="submit">Save</Button>}
          {isEditable && <Button onClick={onCancelHandler}>Cancel</Button>}
        </p>
      </form>
      {mode === "edit" && !isEditable && (
        <Button onClick={onEditHandler}>Edit</Button>
      )}
    </>
  );
};

export default IncidentComponent;
