/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { useContext } from 'react';
import { Drawer, List, ListItem } from '@mui/material';
import SidebarContext from '../stores/sidebarContext';

// const drawerWidth = 240;

const Sidebar = () => {
  const { open } = useContext(SidebarContext);
  const drawerContent = (
    <List>
      <ListItem>
        <Link href="/">
          <a>Home</a>
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/favorites">
          <a>Favorites</a>
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/builder">
          <a>API Builder</a>
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/docs">
          <a>Documentation</a>
        </Link>
      </ListItem>
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
