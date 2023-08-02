import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';


export const Dashboard= () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handlePageRefresh = (event : BeforeUnloadEvent) => {
            sessionStorage.setItem('refreshed', 'true');
            event.preventDefault();
            event.returnValue = '';
        };

        const shouldRefresh = sessionStorage.getItem('refreshed') === 'true';

        if (shouldRefresh){
            sessionStorage.removeItem('refreshed');
            navigate('/')
        } else {
            window.addEventListener('beforeunload', handlePageRefresh);
        }

        return () => {
            window.removeEventListener('beforeunload', handlePageRefresh);
        };
    }, [navigate]);

    const handleSignout = () => {
        sessionStorage.removeItem('isLoggedIn');
        navigate('/Login');
    };

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');

        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [navigate]);

  return (
    <div>
        <AppBar position="static">
            <Toolbar>
                <Typography variant='h6' style={{flexGrow: 1 }}>
                    Dashboard
                </Typography>
                <Button color='inherit' onClick={handleSignout}>
                    Sign Out
                </Button>
            </Toolbar>
        </AppBar>






    </div>
  );
};
