/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import SportsSoccerOutlinedIcon from '@mui/icons-material/SportsSoccerOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import DehazeIcon from '@mui/icons-material/Dehaze';
import AuthContext from '../stores/authContext';
import SidebarContext from '../stores/sidebarContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  navLink: {
    display: 'flex !important',
    alignItems: 'center !important',
  },
  welcome: {
    display: 'flex',
    alignItems: 'center',
  },
  greeting: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'flex !important',
    alignItems: 'center !important',
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const router = useRouter();
  const { user, logout, fetching } = useContext(AuthContext);
  const { toggle } = useContext(SidebarContext);
  return (
    <div>
      <AppBar elevation={0} position="fixed" style={{ zIndex: '100000000000' }}>
        <Toolbar className={classes.root}>
          {router.pathname !== '/login' && router.pathname !== '/register' && (
            <Button onClick={toggle}>
              <DehazeIcon color="secondary" />
            </Button>
          )}
          <Link href="/">
            <a className={classes.title}>
              <SportsSoccerOutlinedIcon />
              <Typography
                variant="h5"
                component="h1"
              >
                Twitter SA
              </Typography>
            </a>
          </Link>
          {!user && (
            <>
              <>
                { fetching && (
                  <Box>
                    <CircularProgress color="secondary" sx={{ fontSize: '8px', marginRight: '16px' }} />
                  </Box>
                )}
              </>
              <Link href="/login" passHref>
                <a className={classes.navLink}>
                  <Button variant="text" color="secondary">
                    Login/Register
                  </Button>
                </a>
              </Link>
            </>
          )}
          {user && (
            <div className={classes.welcome}>
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <Typography className={classes.greeting}>
                  Hello,
                  {' '}
                  {user.name}
                </Typography>
              </Box>
              <Button variant="contained" color="secondary" endIcon={<LogoutIcon />} onClick={logout}>
                Sign Out
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
