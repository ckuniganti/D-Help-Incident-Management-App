import React, {useState} from "react";
import { registerUser } from "../../Api/userApi";
import { Container, TextField, Button, Typography, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import './Register.css';
import Login from "../Login/Login";
//import Login from

interface RegisterProps {
  onSucess: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSucess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const handleRegister = async () => {
      if(!email || !password){
        setError('Please enter both email and password.');
        return;
      }

      if (!isValidEmail(email)) {
        setError('Please enter a valid email address e.g ABC@gmail.com!');
        return;
      }

      if (password.length < 6) {
        setError('Password should be at least 6 characters long.')
        return;
      }

      setLoading(true);

      const success = await registerUser(email, password);
      if (success) {
        setError('');
        alert('Registration successful!');
        setEmail('');
        setPassword('');
        setRegistrationSuccess(true);
        onSucess();
    }else {
      setError('User already exists with this email. Please choose another email.');
    }

    setLoading(false);
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleDialogClose = () => {
    setRegistrationSuccess(false); // Close the dialog
  };

  
    return(
      <div>
      {loading ? (
        <div className="loading-container">
          <CircularProgress />
          <Typography variant="body1">Taking you to the login page...</Typography>
        </div>
      ) : (
        <Container maxWidth="xs" className="register-container">
          <div className="register-form">
            <Typography variant="h3" gutterBottom>Register</Typography>
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
            <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
              Register
            </Button>
            <p className="Login-link">Want to Login? <a href="/Login">Login</a></p>
          </div>
        </Container>
      )}

      {/* Dialog to show the "Registration successful" message */}
      <Dialog open={registrationSuccess} onClose={handleDialogClose}>
        <DialogTitle>Registration Successful</DialogTitle>
        <DialogContent>
          <Typography variant="body1">You have successfully registered. Please login.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

  export default Register;
  