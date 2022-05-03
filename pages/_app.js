import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StylesProvider, createGenerateClassName } from '@mui/styles';
import { AuthContextProvider } from '../stores/authContext';
import { SidebarContextProvider } from '../stores/sidebarContext';
import Layout from '../components/layout';
import '../styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const generateClassName = createGenerateClassName({
  productionPrefix: 'c',
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#f1f1f1',
    },
  },
  typography: {
    fontFamily: 'Ubuntu, sans-serif',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <SidebarContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SidebarContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default MyApp;
