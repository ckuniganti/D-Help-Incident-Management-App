import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import {
  Box,
  Button,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Modal,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
interface AuthenticationProps {
  authHandler: (isLogin: boolean) => void;
}
export default function Navigation({ authHandler }: AuthenticationProps) {
  const user = React.useContext(UserContext);
  const navigate = useNavigate();
  const settings = ["Profile", "Logout"];

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [openProfileModal, setOpenProfileModal] =
    React.useState<boolean>(false);
  const handleOpenProfileModal = () => {
    handleCloseUserMenu();
    setOpenProfileModal(true);
  };
  const handleCloseProfileModal = () => setOpenProfileModal(false);

  const logoutHandler = () => {
    sessionStorage.removeItem("userToken");
    authHandler(false);
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/");
  };

  const style = {
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
  const avatarUrl = "/static/images/avatar/" + user.firstName + ".jpg";
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Avatar src="/static/images/avatar/Deloitte.jpg" />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <p> Deloitte Incident Management Portal</p>
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            {sessionStorage.getItem("userToken") && user && user.userName && (
              <p>
                Welcome {user.firstName} {user.lastName} !
              </p>
            )}
          </Typography>
          {/* {sessionStorage.getItem("userToken") && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          )} */}

          {sessionStorage.getItem("userToken") && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Avatar image" src={avatarUrl} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={
                      setting == "Logout"
                        ? logoutHandler
                        : handleOpenProfileModal
                    }
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Modal
        open={openProfileModal}
        onClose={handleCloseProfileModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{user && user.userName && <Profile user={user} />}</Box>
      </Modal>
    </Box>
  );
}
