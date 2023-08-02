import {
  TextField,
  Box,
  Button,
  Container,
  AppBar,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import LoginData from "../CommonInterfaces/LoginData";
import { useNavigate, json } from "react-router-dom";
import axios from "axios";
import User from "../CommonInterfaces/User";
import { useState } from "react";
import Alert from "@mui/material/Alert";

interface UserProps {
  userCnxtHandler: (user: User) => void;
  authHandler: (isLogin: boolean) => void;
}
const Login = ({ userCnxtHandler, authHandler }: UserProps) => {
  const navigate = useNavigate();
  const [loginMsg, setLoginMsg] = useState<string>();
  const { handleSubmit, register, reset, formState } = useForm<LoginData>();
  const {
    errors,
    isDirty,
    isValid,
    touchedFields,
    dirtyFields,
    isSubmitted,
    isSubmitSuccessful,
    isSubmitting,
  } = formState;

  const onFormChangeHandler = () => {
    setLoginMsg(undefined);
  };

  // if (loginMsg && (touchedFields.userName || touchedFields.password)) {
  //   onFormChangeHandler();
  // }

  const onSubmitHandler = (data: LoginData) => {
    axios
      .post("http://localhost:8080/login", data)
      .then((response) => {
        if (response.status === 201 && response.data.user !== undefined) {
          console.log("**********Login Successful*********", response);
          userCnxtHandler(response.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          sessionStorage.setItem("userToken", "SecretPassword");
          authHandler(true);
          navigate("/home");
        }
      })
      .catch((error) => {
        if (
          error.response &&
          (error.response.status === 422 || error.response.status === 401)
        ) {
          console.log("setting message");
          setLoginMsg("Incorrect UserName or Password");
        }
      });
  };
  const style = {
    position: "absolute" as "absolute",
    maxWidth: "100%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    "& > :not(style)": { m: 1, width: "25ch" },
  };
  const elementStyle = { width: 300, m: 1 };
  return (
    <>
      <Container maxWidth="sm">
        <Box sx={style}>
          <Box>
            <Typography variant="h4">Login</Typography>
          </Box>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            {loginMsg && (
              <Alert sx={{ width: 265, m: 1 }} severity="error">
                Invalid User Name or Password
              </Alert>
            )}
            <TextField
              fullWidth
              required
              sx={elementStyle}
              id="userName"
              label="User Name"
              variant="outlined"
              {...register("userName")}
            ></TextField>
            <TextField
              required
              sx={elementStyle}
              type="password"
              id="password"
              label="Password"
              variant="outlined"
              {...register("password")}
            ></TextField>
            <Box sx={{ width: 400 }}>
              <Button
                variant="contained"
                sx={{ width: 150, m: 1 }}
                type="submit"
              >
                Login
              </Button>
              <Button
                variant="contained"
                sx={{ width: 150, m: 1 }}
                onClick={() => {
                  onFormChangeHandler();
                  reset();
                }}
              >
                cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Login;
