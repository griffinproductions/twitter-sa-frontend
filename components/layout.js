/* eslint-disable no-nested-ternary */
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import Head from 'next/head';
import Navbar from './navbar';
import Sidebar from './sidebar';
import SidebarContext from '../stores/sidebarContext';
import AuthContext from '../stores/authContext';

const Layout = ({ children }) => {
  const router = useRouter();
  const { open } = useContext(SidebarContext);
  const { user } = useContext(AuthContext);
  if (router.pathname === '/login' || router.pathname === '/register') {
    return (
      <>
        <Head>
          <title>Twitter-SA</title>
        </Head>
        <Navbar />
        {children}
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Twitter-SA</title>
      </Head>
      <div>
        <Navbar open={open} />
        <Sidebar open={open} />
        <Box sx={{ marginTop: { xs: (user?.permissions === 'admin' || user?.permissions === 'broadcaster') ? (open ? '306px' : '64px') : (open ? '194.04px' : '56px'), md: '68px' }, marginLeft: { sx: 0, md: open ? '174.446px' : 0 }, transition: 'margin 225ms' }}>
          {children}
        </Box>
      </div>
    </>
  );
};

export default Layout;
