import Incident from "../CommonInterfaces/Incident";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SaveIncidentRequest from "../CommonInterfaces/SaveIncidentRequest";
import UserContext from "../Context/UserContext";
import {
  TextField,
  Box,
  Button,
  Container,
  Typography,
  Alert,
} from "@mui/material";
import User from "../CommonInterfaces/User";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
interface IncidentProps {
  incident: Incident;
  incHandler: (incidents: Incident[]) => void;
  userCnxtHandler: (user: User) => void;
  handleCloseModal: () => void;
  mode: string;
  alertMsgHandler: (msg: string) => void;
  handleOpenAlert: () => void;
}
const IncidentComponent = ({
  incident,
  incHandler,
  userCnxtHandler,
  handleCloseModal,
  mode,
  alertMsgHandler,
  handleOpenAlert,
}: IncidentProps) => {
  const userCnxt = useContext(UserContext);
  const [inc, setIncident] = useState<Incident>(incident);
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
    localStorage.setItem("user", JSON.stringify(user));
    userCnxtHandler(user);
  };
  const { handleSubmit, register, reset, formState } = useForm<Incident>();
  const { errors } = formState;
  const onSaveHandler = (data: Incident) => {
    if (mode === "edit") {
      data = { ...data, incidentID: incident.incidentID };
    }
    const request: SaveIncidentRequest = {
      userName: data.requestedFor,
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
        if (
          response.data.Incident.requestedFor === userCnxt.userName ||
          userCnxt.role == "admin"
        ) {
          replaceIncident(response.data.Incident);
        }
        console.log("Response message after save", response.data.message);
        handleCloseModal();
        alertMsgHandler(response.data.message);
        handleOpenAlert();
      })
      .catch((error) => {
        console.log("Error occurred:", error);
      });
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
      {errors?.requestedFor && (
        <Alert severity="error">{errors?.requestedFor?.message}</Alert>
      )}
      {errors?.effectiveDate && (
        <Alert severity="error">{errors?.effectiveDate?.message}</Alert>
      )}
      {errors?.environmentType && (
        <Alert severity="error">{errors?.environmentType?.message}</Alert>
      )}
      {errors?.application && (
        <Alert severity="error">{errors?.application?.message}</Alert>
      )}
      {errors?.createdTime && (
        <Alert severity="error">{errors?.createdTime?.message}</Alert>
      )}
      {errors?.updatedBy && (
        <Alert severity="error">{errors?.updatedBy?.message}</Alert>
      )}
      {errors?.updatedTime && (
        <Alert severity="error">{errors?.updatedTime?.message}</Alert>
      )}
      {errors?.status && (
        <Alert severity="error">{errors?.status?.message}</Alert>
      )}
      {errors?.environment && (
        <Alert severity="error">{errors?.environment?.message}</Alert>
      )}
      {mode === "edit" && (
        <Typography variant="h5">
          Incident Details for {inc.incidentID}
        </Typography>
      )}
      {mode === "add" && <Typography variant="h5">New Incident</Typography>}
      <Container maxWidth="sm">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
        >
          <TextField
            type="text"
            id="requestedFor"
            label="Requested For"
            required
            defaultValue={
              incident.requestedFor === ""
                ? userCnxt.userName
                : inc.requestedFor
            }
            {...register("requestedFor", {
              required: {
                value: true,
                message: "'Requested For' is required",
              },
            })}
          />
          <TextField
            type="date"
            id="effectiveDate"
            label="Effective Date"
            required
            defaultValue={inc.effectiveDate}
            {...register("effectiveDate", {
              required: {
                value: true,
                message: "'Effective Date' is required",
              },
              validate: (fieldData) => {
                return (
                  new Date(fieldData) >= new Date() ||
                  "'Effective Date' should be in future"
                );
              },
            })}
          />
          <FormControl fullWidth>
            <InputLabel id="environmentTypeLabel">Environment Type</InputLabel>
            <Select
              labelId="senvironmentTypeLabel"
              id="environmentType"
              value={inc.environmentType}
              label="Environment Type"
              required
              {...register("environmentType", {
                required: {
                  value: true,
                  message: "'Environment Type' is required",
                },
              })}
              onChange={(event: SelectChangeEvent) => {
                setIncident({
                  ...inc,
                  environmentType: event.target.value as string,
                });
              }}
            >
              <MenuItem value={"Prod"}>Prod</MenuItem>
              <MenuItem value={"Non-Prod"}>Non-Prod</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="environmentLabel">Environment</InputLabel>
            <Select
              labelId="environmentLabel"
              id="environmentType"
              value={inc.environment}
              label="Environment"
              required
              {...register("environment", {
                required: {
                  value: true,
                  message: "'Environment' is required",
                },
              })}
              onChange={(event: SelectChangeEvent) => {
                setIncident({
                  ...inc,
                  environment: event.target.value as string,
                });
              }}
            >
              <MenuItem value={"Dev"}>L1-Dev</MenuItem>
              <MenuItem value={"Testing"}>L2-Testing</MenuItem>
              <MenuItem value={"UAT"}>L3-UAT</MenuItem>
              <MenuItem value={"Prod"}>L4-Prod</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="applicationLabel">Application</InputLabel>
            <Select
              labelId="applicationLabel"
              id="application"
              value={inc.application}
              label="Application"
              required
              {...register("application", {
                required: {
                  value: true,
                  message: "'Application' is required",
                },
              })}
              onChange={(event: SelectChangeEvent) => {
                setIncident({
                  ...inc,
                  application: event.target.value as string,
                });
              }}
            >
              <MenuItem value={"PC-Guidewire"}>PC-Guidewire</MenuItem>
              <MenuItem value={"BC-Guidewire"}>BC-Guidewire</MenuItem>
              <MenuItem value={"CC-Guidewire"}>CC-Guidewire</MenuItem>
              <MenuItem value={"PC-Portal"}>PC-Portal</MenuItem>
              <MenuItem value={"BC-Portal"}>BC-Portal</MenuItem>
              <MenuItem value={"CC-Portal"}>CC-Portal</MenuItem>
              <MenuItem value={"SQL"}>SQL</MenuItem>
              <MenuItem value={"AWS"}>AWS</MenuItem>
              <MenuItem value={"DataLake"}>DataLake</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="statusLabel">Status</InputLabel>
            <Select
              labelId="statusLabel"
              id="status"
              value={inc.status}
              label="Status"
              required
              {...register("status", {
                required: {
                  value: true,
                  message: "'Status' is required",
                },
              })}
              onChange={(event: SelectChangeEvent) => {
                console.log("select change event called", event.target.value);
                setIncident({ ...inc, status: event.target.value as string });
              }}
            >
              <MenuItem value={"Open"}>Open</MenuItem>
              <MenuItem value={"In-Progress"}>In-Progress</MenuItem>
              <MenuItem value={"Closed"}>Closed</MenuItem>
            </Select>
          </FormControl>
          <TextField
            type="text"
            id="description"
            label="Description"
            defaultValue={inc.description}
            {...register("description")}
            multiline
          />
          <TextField
            type="date"
            id="createdTime"
            label="Created Date"
            required
            defaultValue={inc.createdTime}
            {...register("createdTime", {
              required: {
                value: true,
                message: "'Created Date' is required",
              },
            })}
          />
          <TextField
            id="updatedBy"
            label="Updated By"
            required
            defaultValue={
              incident.updatedBy === "" ? userCnxt.userName : inc.updatedBy
            }
            {...register("updatedBy", {
              required: {
                value: true,
                message: "'Updated By' is required",
              },
            })}
          />
          <TextField
            type="date"
            id="updatedTime"
            label="Updated Time"
            required
            defaultValue={inc.updatedTime}
            {...register("updatedTime", {
              required: {
                value: true,
                message: "'Updated Time' is required",
              },
            })}
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
