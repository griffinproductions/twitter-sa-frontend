/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { useContext } from 'react';
import { useRouter } from 'next/router';
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
    '&:hover': {
      color: '#FFF',
      '& $sideIcon': {
        color: '#FFF',
      },
    },
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
  },
  sideIcon: {
    '&:hover': {
      color: '#FFF',
    },
    marginRight: '8px',
  },
  sideLinkActive: {
    display: 'flex',
    alignItems: 'center',
    color: '#FFF',
    background: theme.palette.primary.main,
    padding: '16px',
    width: '100%',
  },
  sideIconActive: {
    color: '#FFF',
    marginRight: '8px',
  },
}));

const Sidebar = () => {
  const { open } = useContext(SidebarContext);
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const classes = useStyles();
  const drawerContent = (
    <List sx={{ marginTop: { xs: 0, md: '64px' }, paddingTop: 0, paddingBottom: 0 }}>
      <ListItem className={classes.linkItem}>
        <Link href="/">
          <a className={router.pathname === '/' ? classes.sideLinkActive : classes.sideLink}>
            <HomeIcon color="primary" className={router.pathname === '/' ? classes.sideIconActive : classes.sideIcon} />
            <Typography style={{ display: 'inline' }}>
              Home
            </Typography>
          </a>
        </Link>
      </ListItem>
      <ListItem className={classes.linkItem}>
        <Link href="/favorites">
          <a className={router.pathname === '/favorites' ? classes.sideLinkActive : classes.sideLink}>
            <AnalyticsIcon color="primary" className={router.pathname === '/favorites' ? classes.sideIconActive : classes.sideIcon} />
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
              <a className={router.pathname === '/builder' ? classes.sideLinkActive : classes.sideLink}>
                <HandymanIcon color="primary" className={router.pathname === '/builder' ? classes.sideIconActive : classes.sideIcon} />
                <Typography style={{ display: 'inline' }}>
                  API Builder
                </Typography>
              </a>
            </Link>
          </ListItem>
          <ListItem className={classes.linkItem}>
            <Link href="/docs">
              <a className={router.pathname === '/docs' ? classes.sideLinkActive : classes.sideLink}>
                <ArticleIcon color="primary" className={router.pathname === '/docs' ? classes.sideIconActive : classes.sideIcon} />
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
        sx={{ display: { xs: 'none', md: 'block' } }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="persistent"
        open={open}
        anchor="top"
        sx={{ display: { xs: 'block', md: 'none' }, top: '64px', marginTop: '64px' }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
