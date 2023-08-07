import Incident from "../CommonInterfaces/Incident";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useContext } from "react";
import Note from "../CommonInterfaces/Note";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import User from "../CommonInterfaces/User";
import SaveIncidentRequest from "../CommonInterfaces/SaveIncidentRequest";
import { getDateOnlyInString } from "../Util/helper";
import UserContext from "../Context/UserContext";
import Chip from "@mui/material/Chip";
interface IncidentProps {
  incident: Incident;
  incidentsHandler: (incidents: Incident[]) => void;
  userCnxtHandler: (user: User) => void;
  handleCloseNotesModal: () => void;
  alertMsgHandler: (msg: string) => void;
  handleOpenAlert: () => void;
}
interface NoteEditProp {
  note: string;
}

const NoteForm = ({
  incident,
  incidentsHandler,
  userCnxtHandler,
  handleCloseNotesModal,
  alertMsgHandler,
  handleOpenAlert,
}: IncidentProps) => {
  const userCnxt = useContext(UserContext);
  const notes = incident.notes;
  const { handleSubmit, register } = useForm<NoteEditProp>();

  const onSaveHandler = (data: NoteEditProp) => {
    const notes = incident.notes || [];

    const newNote: Note = {
      authorName: userCnxt.firstName,
      noteAddedDate: getDateOnlyInString(new Date()),
      note: data.note,
    };

    const updatedNotes = [...notes, newNote];
    const updatedIncident: Incident = { ...incident, notes: updatedNotes };
    const request: SaveIncidentRequest = {
      userName: updatedIncident.requestedFor,
      incident: updatedIncident,
    };

    console.log("Data from Incident Form", request);
    const url = "http://localhost:8080/users/user/incident/update";
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
        handleCloseNotesModal();
        alertMsgHandler(response.data.message);
        handleOpenAlert();
      })
      .catch((error) => {
        console.log("Error occurred:", error);
      });
  };

  const onCancelHandler = () => {
    handleCloseNotesModal();
  };

  const replaceIncident = (data: Incident) => {
    let updatedIncidents: Incident[];
    updatedIncidents = userCnxt.incidents.map((inc: Incident) =>
      inc.incidentID === data.incidentID ? data : inc
    );
    incidentsHandler(updatedIncidents);
    const user: User = { ...userCnxt, incidents: updatedIncidents };
    localStorage.setItem("user", JSON.stringify(user));
    userCnxtHandler(user);
  };
  return (
    <>
      <Box sx={{ maxHeight: 400, overflow: "auto" }}>
        <List
          sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}
        >
          <Typography variant="h4">Notes</Typography>
          {notes &&
            notes.map((note: Note) => (
              <div>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src={`/static/images/avatar/${note.authorName}.jpg`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={note.authorName}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {note.noteAddedDate}
                        </Typography>
                        <Typography sx={{ wordWrap: "break-word" }}>
                          {note.note}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </div>
            ))}
          {!notes && <Typography>No Notes Available!</Typography>}
        </List>
      </Box>
      <Divider variant="middle">
        <Chip label="Add Note" />
      </Divider>
      <Box>
        {/* <Typography variant="h6">Add Note</Typography> */}
        <form onSubmit={handleSubmit(onSaveHandler)} noValidate>
          <TextField
            type="text"
            id="note"
            label="Note"
            required
            defaultValue=""
            fullWidth
            multiline
            {...register("note", {
              required: {
                value: true,
                message: "'Notes' is required field",
              },
            })}
          />
          <Box sx={{ width: 300 }} textAlign={"center"}>
            <Button type="submit" sx={{ width: 100, m: 1 }} variant="contained">
              Save
            </Button>
            <Button
              variant="contained"
              sx={{ width: 100, m: 1 }}
              onClick={onCancelHandler}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default NoteForm;
