import { useState, ChangeEvent, useContext } from "react";
import axios from "axios";
import User from "../CommonInterfaces/User";
import UserContext from "../Context/UserContext";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IncidentDetails from "./IncidentDetails";
import Incident from "../CommonInterfaces/Incident";
import NewIncident from "./NewIncident";

const Home = () => {
  const usercnxt = useContext(UserContext);
  const [user, setUser] = useState<User>(usercnxt);
  const [incident, setIncident] = useState<Incident>();
  const [incidents, setIncidents] = useState<Incident[]>(usercnxt.incidents);
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
    },
    { field: "effectiveDate", headerName: "EffectiveDate" },
    { field: "environmentType", headerName: "EnvironmentType" },
    { field: "application", headerName: "Application" },
    { field: "createdTime", headerName: "CreatedTime" },
    { field: "Status", headerName: "Application" },
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
          <p>
            Displaying Incidents created for {user.firstName} {user.lastName}
            <Button
              variant="contained"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={() => {
                setOpenNewIncidentModal(true);
              }}
            >
              New Incident
            </Button>
          </p>

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
          {incident && <IncidentDetails incident={incident} />}
        </Box>
      </Modal>
      <Modal
        open={openNewIncidentModal}
        onClose={handleCloseNewIncident}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <NewIncident />
        </Box>
      </Modal>
    </>
  );
};

export default Home;
