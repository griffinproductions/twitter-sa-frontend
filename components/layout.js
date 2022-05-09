import { useContext } from 'react';
import { useRouter } from 'next/router';
import Navbar from './navbar';
import Sidebar from './sidebar';
import SidebarContext from '../stores/sidebarContext';

const Layout = ({ children }) => {
  const router = useRouter();
  const { open } = useContext(SidebarContext);
  if (router.pathname === '/login' || router.pathname === '/register') {
    return (
      <>
        <Navbar />
        {children}
      </>
    );
  }
  return (
    <>
      <div style={{ marginLeft: open ? 174.446 : 0, transition: 'margin 225ms' }}>
        <Navbar open={open} />
        <Sidebar open={open} />
        {children}
      </div>
    </>
  );
};

export default Layout;
