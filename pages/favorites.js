/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import { useContext } from 'react';
import {
  Accordion, Typography, AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  Box,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { ExpandMore } from '@mui/icons-material';
import { format } from 'date-fns';
import AuthContext from '../stores/authContext';
import GraphPanel from '../components/graphPanel';

const useStyles = makeStyles(() => ({
  empty: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 260px)',
  },
  arrangeText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  panel: {
    width: '100%',
  },
}));

const Favorites = () => {
  const classes = useStyles();
  const { user, updateFavorites } = useContext(AuthContext);
  const handleUpdateFavorites = (currentFavorite) => {
    let { favorites } = user;
    favorites = favorites.filter((favorite) => favorite.saved !== currentFavorite.saved);
    updateFavorites(favorites);
  };

  return (
    <Container style={{ marginTop: '8px', marginLeft: '8px' }}>
      <Typography variant="h5">
        My Saved Datasets
      </Typography>
      <div style={{ marginTop: '8px' }}>
        {user && user.favorites && user.favorites.map((favorite) => (
          <Accordion key={favorite.saved} style={{ marginBottom: '4px' }} elevation={1}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>
                {favorite.title}
                {' - '}
                {'Saved: '}
                {format(Date.parse(favorite.saved), 'dd/MM/yyyy - hh:mm a')}
              </Typography>
              <Button startIcon={<DeleteForeverIcon />} color="error" variant="contained" style={{ marginRight: '8px' }} onClick={() => handleUpdateFavorites(favorite)}>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  Remove
                </Box>
              </Button>
            </AccordionSummary>
            <AccordionDetails>
              <GraphPanel data={favorite.data} title={favorite.title} loaded="yes" isFavorite initial={false} />
            </AccordionDetails>
          </Accordion>
        ))}
        {!user?.favorites?.length && (
          <div className={classes.panel}>
            <div className={classes.empty}>
              <Box className={classes.arrangeText}>
                <Box>
                  <ErrorOutlineIcon sx={{ fontSize: '40px', color: '#888', marginRight: '16px' }} />
                </Box>
                <Box>
                  <Typography>
                    No saved datasets.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption">
                    Please be logged in and have a dataset to be able to view past datasets.
                  </Typography>
                </Box>
              </Box>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Favorites;
