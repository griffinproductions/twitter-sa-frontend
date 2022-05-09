/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { useContext } from 'react';
import {
  Drawer, List, ListItem, Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import HomeIcon from '@mui/icons-material/Home';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import HandymanIcon from '@mui/icons-material/Handyman';
import ArticleIcon from '@mui/icons-material/Article';
import SidebarContext from '../stores/sidebarContext';
import AuthContext from '../stores/authContext';

const useStyles = makeStyles((theme) => ({
  linkItem: {
    padding: '0px',
    width: '100%',
  },
  sideLink: {
    display: 'flex',
    alignItems: 'center',
    color: '#222',
    padding: '16px',
    width: '100%',
    '&:hover': {
      textDecoration: 'none',
      background: theme.palette.primary.main,
      color: '#FFF',
    },
    '&:focus': {
      textDecoration: 'none',
      background: theme.palette.primary.main,
      color: '#FFF',
    },
  },
  sideIcon: {
    '&:hover': {
      color: '#FFF',
    },
    marginRight: '8px',
  },
}));

const Sidebar = () => {
  const { open } = useContext(SidebarContext);
  const { user } = useContext(AuthContext);
  const classes = useStyles();
  const drawerContent = (
    <List style={{ marginTop: '64px' }}>
      <ListItem className={classes.linkItem}>
        <Link href="/">
          <a className={classes.sideLink}>
            <HomeIcon color="primary" className={classes.sideIcon} />
            <Typography style={{ display: 'inline' }}>
              Home
            </Typography>
          </a>
        </Link>
      </ListItem>
      <ListItem className={classes.linkItem}>
        <Link href="/favorites">
          <a className={classes.sideLink}>
            <AnalyticsIcon color="primary" className={classes.sideIcon} />
            <Typography style={{ display: 'inline' }}>
              Saved Datasets
            </Typography>
          </a>
        </Link>
      </ListItem>
      {user && (user?.permissions === 'admin' || user.permissions === 'broadcaster') && (
        <>
          <ListItem className={classes.linkItem}>
            <Link href="/builder">
              <a className={classes.sideLink}>
                <HandymanIcon color="primary" className={classes.sideIcon} />
                <Typography style={{ display: 'inline' }}>
                  API Builder
                </Typography>
              </a>
            </Link>
          </ListItem>
          <ListItem className={classes.linkItem}>
            <Link href="/docs">
              <a className={classes.sideLink}>
                <ArticleIcon color="primary" className={classes.sideIcon} />
                <Typography style={{ display: 'inline' }}>
                  Documentation
                </Typography>
              </a>
            </Link>
          </ListItem>
        </>
      )}
    </List>
  );
  return (
    <>
      <Drawer
        variant="persistent"
        open={open}
        anchor="left"
        sx={{ display: { xs: 'none', sm: 'block' } }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="persistent"
        open={open}
        anchor="top"
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
