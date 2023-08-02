import { TextField, Box, Button, Container } from "@mui/material";
import { useForm } from "react-hook-form";
import LoginData from "../CommonInterfaces/LoginData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import User from "../CommonInterfaces/User";
interface UserProps {
  userCnxtHandler: (user: User) => void;
  authHandler: (isLogin: boolean) => void;
}
const Login = ({ userCnxtHandler, authHandler }: UserProps) => {
  const navigate = useNavigate();
  const { handleSubmit, register, reset } = useForm<LoginData>();
  const onSubmitHandler = (data: LoginData) => {
    axios.post("http://localhost:8080/login", data).then((response) => {
      if (response.data.user !== undefined) {
        console.log("**********Login Successful*********", response);
        userCnxtHandler(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        sessionStorage.setItem("userToken", "SecretPassword");
        authHandler(true);
        navigate("/home");
      } else {
        console.log("**********Login failed *********", response);
      }
    });
  };
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    "& > :not(style)": { m: 1, width: "25ch" },
  };
  const elementStyle = { m: 1, width: "25ch" };
  return (
    <>
      <Container maxWidth="sm">
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <h2>Login</h2>
            <TextField
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
            <div>
              <Button type="submit">Login</Button>
              <Button
                onClick={() => {
                  reset();
                }}
              >
                cancel
              </Button>
            </div>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Login;
