import { useState, ChangeEvent, useContext } from "react";
import axios from "axios";
import User from "../CommonInterfaces/User";
import UserContext from "../Context/UserContext";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import IncidentDetails from "./IncidentDetails";
import Incident from "../CommonInterfaces/Incident";
import NewIncident from "./NewIncident";

interface UserProps {
  userCnxtHandler: (user: User) => void;
}
const Home = ({ userCnxtHandler }: UserProps) => {
  const usercnxt = useContext(UserContext);
  console.log("*************** after reload", usercnxt);
  const [user, setUser] = useState<User>(usercnxt);
  const [incident, setIncident] = useState<Incident>();
  const [incidents, setIncidents] = useState<Incident[]>(usercnxt.incidents);
  const incidentsHandler = (incidents: Incident[]) => {
    setIncidents(incidents);
  };
  const incidentColumns: GridColDef[] = [
    {
      field: "incidentID",
      headerName: "IncidentID",
      renderCell: (params: GridRenderCellParams<Incident>) => (
        <strong>
          <Button
            variant="text"
            size="small"
            style={{ marginLeft: 16 }}
            tabIndex={params.hasFocus ? 0 : -1}
            onClick={() => {
              setOpenModal(true);
              setIncident(params.row);
            }}
          >
            {params.value}
          </Button>
        </strong>
      ),
      flex: 1,
    },
    { field: "effectiveDate", headerName: "EffectiveDate", flex: 1 },
    { field: "environmentType", headerName: "EnvironmentType", flex: 1 },
    { field: "environment", headerName: "Environment", flex: 1 },
    { field: "application", headerName: "Application", flex: 1 },
    { field: "createdTime", headerName: "CreatedTime", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "requested By",
      headerName: "Created By",
      flex: 1,
      sortable: false,
      valueGetter: (params: GridValueGetterParams) =>
        `${usercnxt.firstName || ""} ${usercnxt.lastName || ""}`,
    },
  ];

  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);

  const [openNewIncidentModal, setOpenNewIncidentModal] = useState(false);
  const handleCloseNewIncident = () => setOpenNewIncidentModal(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      {user && (
        <div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center", // Optional: Vertically align the button with the text
            }}
          >
            <Typography variant="h6">
              Displaying Incidents created for {user.firstName} {user.lastName}
              <Button
                variant="contained"
                size="medium"
                sx={{ margin: 1, marginLeft: 80 }}
                onClick={() => {
                  setOpenNewIncidentModal(true);
                }}
              >
                New Incident
              </Button>
            </Typography>
          </Box>

          <DataGrid
            getRowId={(row) => row.incidentID}
            rows={incidents}
            columns={incidentColumns}
            pageSizeOptions={[5, 10]}
          />
        </div>
      )}
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {incident && (
            <IncidentDetails
              incident={incident}
              incidentsHandler={incidentsHandler}
              userCnxtHandler={userCnxtHandler}
              handleCloseModal={handleClose}
            />
          )}
        </Box>
      </Modal>
      <Modal
        open={openNewIncidentModal}
        onClose={handleCloseNewIncident}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <NewIncident
            incidentsHandler={incidentsHandler}
            userCnxtHandler={userCnxtHandler}
            handleCloseModal={handleCloseNewIncident}
          />
        </Box>
      </Modal>
    </>
  );
};

export default Home;
