/* eslint-disable react/no-array-index-key */
import { useState, useContext, useEffect } from 'react';
import {
  Grid, Typography, Button, Box,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import SaveIcon from '@mui/icons-material/Save';
import DoneIcon from '@mui/icons-material/Done';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {
  RiLayoutBottom2Fill, RiLayoutBottom2Line, RiLayoutColumnFill,
  RiLayoutColumnLine, RiLayoutGridFill, RiLayoutGridLine,
} from 'react-icons/ri';
import GraphSelector from './graphSelector';
import AuthContext from '../stores/authContext';

const useStyles = makeStyles((theme) => ({
  loading: {
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
  layoutIcon: {
    fontSize: '24px',
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
          <Box>
            <ErrorOutlineIcon sx={{ fontSize: '40px', color: '#888', marginRight: '16px' }} />
          </Box>
          <Box className={classes.arrangeText}>
            <Box>
              <Typography>
                No data to display.
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption">
                Please select a fixture to view data.
              </Typography>
            </Box>
          </Box>
        </div>
      )}
      {loaded === 'loading' && (
        <div className={classes.loading}>
          <Box>
            <CircularProgress color="primary" sx={{ fontSize: '40px', marginRight: '16px' }} />
          </Box>
          <Box className={classes.arrangeText}>
            <Box>
              <Typography>
                Loading data...
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption">
                Please wait, this may take a while.
              </Typography>
            </Box>
          </Box>
        </div>
      )}
      {loaded === 'yes' && (
        <Grid container spacing={3} className={classes.gridLayout}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Button color="primary" onClick={() => setDisplayNumber(1)}>
              {displayNumber === 1 && <RiLayoutBottom2Fill className={classes.layoutIcon} /> }
              {displayNumber !== 1 && <RiLayoutBottom2Line className={classes.layoutIcon} /> }
            </Button>
            <Button color="primary" onClick={() => setDisplayNumber(2)}>
              {displayNumber === 2 && <RiLayoutColumnFill className={classes.layoutIcon} /> }
              {displayNumber !== 2 && <RiLayoutColumnLine className={classes.layoutIcon} /> }
            </Button>
            <Button color="primary" onClick={() => setDisplayNumber(4)}>
              {displayNumber === 4 && <RiLayoutGridFill className={classes.layoutIcon} /> }
              {displayNumber !== 4 && <RiLayoutGridLine className={classes.layoutIcon} /> }
            </Button>
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
