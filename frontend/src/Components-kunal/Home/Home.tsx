import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewUserClick = () => {
    navigate('/register');
    setOpen(false);
  };

  const handleLoginClick = () => {
    navigate('/login');
    setOpen(false);
  };

  return (
    <div className="home-container">
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Welcome to Our Project!</DialogTitle>
        <DialogContent>
          <p>Are you a new user or an existing user?</p>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleNewUserClick}>
            New User
          </Button>
          <Button variant="contained" color="secondary" onClick={handleLoginClick}>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
