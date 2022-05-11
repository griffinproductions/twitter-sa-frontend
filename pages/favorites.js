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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ExpandMore } from '@mui/icons-material';
import { format } from 'date-fns';
import AuthContext from '../stores/authContext';
import GraphPanel from '../components/graphPanel';

const Favorites = () => {
  const { user, updateFavorites } = useContext(AuthContext);
  console.log(user);
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
        {!user?.favorites?.length && <Typography variant="body1">No saved datasets</Typography>}
      </div>
    </Container>
  );
};

export default Favorites;
