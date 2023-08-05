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
import { Grid, Typography } from "@mui/material";
import IncidentDetails from "./IncidentDetails";
import Incident from "../CommonInterfaces/Incident";
import NewIncident from "./NewIncident";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import Profile from "./Profile";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";

interface UserProps {
  userCnxtHandler: (user: User) => void;
}
const Home = ({ userCnxtHandler }: UserProps) => {
  const usercnxt = useContext(UserContext);

  const [incident, setIncident] = useState<Incident>();
  const [incidents, setIncidents] = useState<Incident[]>(usercnxt.incidents);
  const incidentsHandler = (incidents: Incident[]) => {
    setIncidents(incidents);
  };

  const getIncidentIdDisplay = (params: GridRenderCellParams<Incident>) => (
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
  );
  const normalIncidentIdDisplayField = (
    params: GridRenderCellParams<Incident>
  ) => <strong>{params.value}</strong>;

  const incidentColumns: GridColDef[] = [
    {
      field: "incidentID",
      headerName: "IncidentID",
      renderCell:
        localStorage.getItem("role") === "admin"
          ? getIncidentIdDisplay
          : normalIncidentIdDisplayField,
      flex: 1,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "effectiveDate",
      headerName: "EffectiveDate",
      flex: 1,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "environmentType",
      headerName: "EnvironmentType",
      flex: 1,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "environment",
      headerName: "Environment",
      flex: 1,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "application",
      headerName: "Application",
      flex: 1,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "createdTime",
      headerName: "CreatedTime",
      flex: 1,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "requestedFor",
      headerName: "Incident Owner",
      flex: 1,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
      renderCell: (params: GridRenderCellParams<Incident>) => (
        <strong>
          <Button
            variant="text"
            size="small"
            style={{ marginLeft: 16 }}
            tabIndex={params.hasFocus ? 0 : -1}
            onClick={() => {
              fetchProfileUserDetails(params.row.requestedFor);
              handleOpenProfileModal();
            }}
          >
            {params.value}
          </Button>
        </strong>
      ),
    },
  ];

  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);

  const [openNewIncidentModal, setOpenNewIncidentModal] = useState(false);
  const handleCloseNewIncident = () => setOpenNewIncidentModal(false);

  const [alertMsg, setAlertMsg] = useState<string>("");
  const [openAlert, setOpenAlertMod] = useState(false);
  const handleOpenAlert = () => {
    console.log("Alert Message was called !!!!!!!");
    setOpenAlertMod(true);
  };
  const handleCloseAlert = () => setOpenAlertMod(false);
  const alertMsgHandler = (msg: string) => {
    console.log("@@@@@@@@@@@@alertMessage", msg);
    setAlertMsg(msg);
  };

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
  const profileBoxStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 370,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [openProfileModal, setOpenProfileModal] = useState<boolean>(false);
  const handleOpenProfileModal = () => setOpenProfileModal(true);
  const handleCloseProfileModal = () => setOpenProfileModal(false);
  const [profileUser, setProfileUser] = useState<User>(usercnxt);
  const fetchProfileUserDetails = (profileUserName: string) => {
    axios
      .post("http://localhost:8080/users/user", { userName: profileUserName })
      .then((response) => {
        console.log(response.data.user);
        setProfileUser(response.data.user);
      });
  };

  return (
    <>
      {usercnxt && (
        <div>
          <Box>
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <Typography sx={{ margin: 1, marginLeft: 10 }} variant="h5">
                  Incidents
                </Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Button
                  variant="contained"
                  size="medium"
                  onClick={() => {
                    setOpenNewIncidentModal(true);
                  }}
                >
                  New Incident
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ width: "100%", alignItems: "center" }}>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={openAlert}
              autoHideDuration={6000}
              onClose={handleCloseAlert}
            >
              <Alert
                variant="filled"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={handleCloseAlert}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {alertMsg}
              </Alert>
            </Snackbar>
          </Box>
          <Box
            sx={{
              "& .super-app-theme--header": {
                backgroundColor: "rgba(25, 118, 210, 0.7)",
                color: "rgba(255, 255, 255, 1)",
              },
            }}
          >
            <DataGrid
              getRowId={(row) => row.incidentID}
              rows={usercnxt.incidents}
              columns={incidentColumns}
              initialState={{
                pagination: { paginationModel: { pageSize: 5 } },
              }}
              pageSizeOptions={[5, 10, 25, 50, 100]}
            />
          </Box>
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
              alertMsgHandler={alertMsgHandler}
              handleOpenAlert={handleOpenAlert}
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
            alertMsgHandler={alertMsgHandler}
            handleOpenAlert={handleOpenAlert}
          />
        </Box>
      </Modal>
      <Modal
        open={openProfileModal}
        onClose={handleCloseProfileModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={profileBoxStyle}>
          {profileUser && profileUser.userName && (
            <Profile user={profileUser} />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Home;
