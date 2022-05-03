import { createContext, useState } from 'react';

const SidebarContext = createContext({
  open: false,
  toggle: () => {},
});

export const SidebarContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };

  const context = { open, toggle };
  return (
    <SidebarContext.Provider value={context}>
      { children }
    </SidebarContext.Provider>
  );
};

export default SidebarContext;
