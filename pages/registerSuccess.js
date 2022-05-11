/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { makeStyles } from '@mui/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
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
  link: {
    textDecoration: 'underline',
    color: 'blue',
    '&:hover': {
      color: 'blue',
    },
  },
}));

const RegisterSuccess = () => {
  const classes = useStyles();
  return (
    <div className={classes.docsContainer}>
      <CheckCircleOutlineIcon color="success" sx={{ fontSize: 64 }} />
      <Box className={classes.block}>
        <Typography variant="h6">
          Account created successfully!
        </Typography>
      </Box>
      <Box className={classes.block}>
        <Typography>
          Please click
          {' '}
          <Link href="/">
            <a className={classes.link}>here</a>
          </Link>
          {' '}
          to be redirected to the home page.
        </Typography>
      </Box>
    </div>
  );
};

export default RegisterSuccess;
