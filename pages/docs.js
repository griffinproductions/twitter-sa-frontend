import { makeStyles } from '@mui/styles';
import ConstructionIcon from '@mui/icons-material/Construction';
import { Box, Typography } from '@mui/material';

const useStyles = makeStyles(() => ({
  docsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 100px)',
  },
  block: {
    display: 'block',
  },
}));

const Docs = () => {
  const classes = useStyles();
  return (
    <div className={classes.docsContainer}>
      <ConstructionIcon sx={{ fontSize: 64, color: '#888' }} />
      <Box className={classes.block}>
        <Typography variant="h6">
          This page is currently under construction.
        </Typography>
      </Box>
      <Box className={classes.block}>
        <Typography>
          Please check back later.
        </Typography>
      </Box>
    </div>
  );
};

export default Docs;
