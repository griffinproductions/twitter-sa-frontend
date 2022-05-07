/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';
import GraphSelector from './graphSelector';

const useStyles = makeStyles((theme) => ({
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  loadingMessage: {
    marginRight: theme.spacing(1),
  },
  gridLayout: {
    display: 'flex',
    justifyContent: 'end',
  },
  graphPanel: {
    width: '100%',
  },
  graphItem: {
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '5px',
  },
}));

const GraphPanel = ({ loaded, data }) => {
  const classes = useStyles();
  const [displayNumber, setDisplayNumber] = useState(1);
  return (
    <div className={classes.graphPanel}>
      {loaded === 'no' && (
        <Typography>
          No data to display. Please select a fixture to view data.
        </Typography>
      )}
      {loaded === 'loading' && (
        <div className={classes.loading}>
          <Typography className={classes.loadingMessage}>
            Loading data... Please wait, this may take a while.
          </Typography>
          <CircularProgress color="secondary" />
        </div>
      )}
      {loaded === 'yes' && (
        <Grid container spacing={3} className={classes.gridLayout}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Button color="secondary" onClick={() => setDisplayNumber(1)}>One</Button>
            <Button color="secondary" onClick={() => setDisplayNumber(2)}>Two</Button>
            <Button color="secondary" onClick={() => setDisplayNumber(4)}>Four</Button>
          </Grid>
          <Grid item xs={12} md={12} lg={12} xl={12} container>
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
