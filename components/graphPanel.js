/* eslint-disable react/no-array-index-key */
import { useState, useContext, useEffect } from 'react';
import {
  Grid, Typography, Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import SaveIcon from '@mui/icons-material/Save';
import DoneIcon from '@mui/icons-material/Done';
import CircularProgress from '@mui/material/CircularProgress';
import GraphSelector from './graphSelector';
import AuthContext from '../stores/authContext';

const useStyles = makeStyles((theme) => ({
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 260px)',
  },
  loadingMessage: {
    marginRight: theme.spacing(1),
  },
  gridLayout: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'start',
  },
  graphPanel: {
    width: '100%',
  },
  graphItem: {
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '5px',
  },
  favorite: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
  },
  graphContainer: {
    paddingRight: '16px',
    paddingLeft: '8px',
    overflowY: 'scroll',
    maxHeight: 'calc(100vh - 260px)',
    paddingBottom: '16px',
    paddingTop: '8px !important',
    marginTop: '16px',
  },
}));

const GraphPanel = ({
  loaded, data, title, isFavorite, initial,
}) => {
  const classes = useStyles();
  const { user, updateFavorites } = useContext(AuthContext);
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);
  const [displayNumber, setDisplayNumber] = useState(1);

  const handleUpdateFavorites = () => {
    const { favorites } = user;
    const saved = new Date();
    if (!isFavoriteState) {
      favorites.push({ data, title, saved });
      setIsFavoriteState(true);
      updateFavorites(favorites);
    }
  };

  useEffect(() => {
    setIsFavoriteState(false);
  }, [data]);

  return (
    <div className={classes.graphPanel}>
      {loaded === 'no' && (
        <div className={classes.loading}>
          <Typography>
            No data to display. Please select a fixture to view data.
          </Typography>
        </div>
      )}
      {loaded === 'loading' && (
        <div className={classes.loading}>
          <Typography className={classes.loadingMessage}>
            Loading data... Please wait, this may take a while.
          </Typography>
          <CircularProgress color="primary" />
        </div>
      )}
      {loaded === 'yes' && (
        <Grid container spacing={3} className={classes.gridLayout}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Button color="primary" onClick={() => setDisplayNumber(1)}>One</Button>
            <Button color="primary" onClick={() => setDisplayNumber(2)}>Two</Button>
            <Button color="primary" onClick={() => setDisplayNumber(4)}>Four</Button>
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6} className={classes.favorite}>
            {!isFavoriteState && initial && (
              <Button startIcon={<SaveIcon />} color="primary" variant="contained" onClick={() => handleUpdateFavorites()}>
                Save Dataset
              </Button>
            )}
            {isFavoriteState && initial && (
              <Button endIcon={<DoneIcon />} color="primary" variant="contained" disabled>
                Saved
              </Button>
            )}
          </Grid>
          <Grid item xs={12} container className={classes.graphContainer}>
            {[...Array(displayNumber)].map((_, i) => {
              const mdWidth = displayNumber === 4 ? 6 : 12 / displayNumber;
              return (
                <Grid key={i} item xs={12} md={mdWidth} className={classes.graphItem}>
                  <GraphSelector data={data} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default GraphPanel;
