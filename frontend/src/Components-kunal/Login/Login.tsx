import React, { useState} from "react";
import { loginUser } from "../../Api/userApi";
import { Container, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { Navigate, useNavigate } from "react-router-dom";
import './Login.css';
import { error } from "console";



const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');
    const navigate = useNavigate();

  
    const handleLogin = async () => {
      if(!email || !password){
        setError('Please enter both email and password.');
        return;
      }


      const success = await loginUser(email, password);
      //const user = users.find((user: any) => user.email === email && user.password === password);
      if (success) {
        sessionStorage.setItem('isLoggedIn', 'true')
        setError('');
        setEmail('');
        setPassword('');
        alert('Login successful!');
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    };
  
    return (
      <Container maxWidth="xs" className="login-container">
      <div className="login-form">
        <Typography variant="h3" gutterBottom>Login</Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        {error && <Typography color="error">{error}</Typography>}
        {loading ? (
          <CircularProgress />
        ) : (
          <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
            Login
          </Button>
        )}
        <p className="register-link">Don't have an account? <a href="/register">Register</a></p>
      </div>
    </Container>
  );
};

  
  export default Login;
  