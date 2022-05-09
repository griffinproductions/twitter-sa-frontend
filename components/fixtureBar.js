/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Avatar, Accordion, Typography, AccordionDetails, Grid,
  Chip, AccordionSummary, Button, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio, Box,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';
import { format } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  fixtureBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 0,
  },
  chip: {
    fontSize: '8px',
  },
  homeAvatar: {
    marginLeft: theme.spacing(1),
  },
  awayAvatar: {
    marginRight: theme.spacing(1),
  },
  team: {
    display: 'flex',
    alignItems: 'center',
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em',
      borderRadius: '0.25em',
      paddingLeft: '16px',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
      borderRadius: '0.25em',
      paddingLeft: '16px',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.2)',
      borderRadius: '0.25em',
      paddingLeft: '16px',
    },
  },
  fixtureContainer: {
    paddingRight: '16px',
    paddingLeft: '8px',
    overflowY: 'scroll',
    maxHeight: 'calc(100vh - 160px)',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
    backgroundColor: '#eee',
    paddingBottom: '16px',
  },
  date: {
    display: 'inline',
    borderBottom: '1px solid #dddddd',
    paddingRight: '16px',
    paddingBottom: '4px',
  },
}));

const FixtureBar = ({ fixtures, getProcessedData }) => {
  const classes = useStyles();
  const [category, setCategory] = useState('match');
  const [team, setTeam] = useState('both');

  const handleSubmit = (e, fixture) => {
    e.preventDefault();
    console.log(fixture);
    getProcessedData(fixture, category, team);
  };
  return (
    <>
      <Typography variant="h5" style={{ paddingLeft: '8px', marginBottom: '8px' }}>
        Recent Fixtures
      </Typography>
      <div className={classes.fixtureContainer}>
        {fixtures.map((fixture) => (
          <Accordion key={fixture._id} style={{ marginBottom: '4px' }} elevation={1}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography className={classes.date}>
                    {format(new Date(fixture.startDate), 'MMM dd, yyyy - HH:mm')}
                  </Typography>
                </Grid>
                <Grid item xs={12} className={classes.fixtureBar}>
                  <Chip label={fixture.status} variant="outlined" className={classes.chip} />
                  <Typography variant="p" className={classes.team}>
                    <Box display={{ xs: 'none', sm: 'inline' }}>
                      <Typography>
                        {fixture.teams.home.name}
                      </Typography>
                    </Box>
                    <Avatar src={fixture.teams.home.logo} className={classes.homeAvatar} />
                  </Typography>
                  <Typography>
                    {fixture.goals.home}
                    {' - '}
                    {fixture.goals.away}
                  </Typography>
                  <Typography variant="p" className={classes.team}>
                    <Avatar src={fixture.teams.away.logo} className={classes.awayAvatar} />
                    <Box display={{ xs: 'none', sm: 'inline' }}>
                      <Typography>
                        {fixture.teams.away.name}
                      </Typography>
                    </Box>
                  </Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <form onSubmit={(e) => handleSubmit(e, fixture)}>
                <Typography>
                  Generate Graphs
                </Typography>
                <FormControl color="primary">
                  <FormLabel color="primary">Select team to analyse tweets for</FormLabel>
                  <RadioGroup value={team} onChange={(e) => setTeam(e.target.value)}>
                    <FormControlLabel value="both" control={<Radio color="primary" />} label="Both" />
                    <FormControlLabel value="home" control={<Radio color="primary" />} label={fixture.teams.home.name} />
                    <FormControlLabel value="away" control={<Radio color="primary" />} label={fixture.teams.away.name} />
                  </RadioGroup>
                </FormControl>
                <hr />
                <FormControl color="primary">
                  <FormLabel color="primary">Select Timeframe to Analyse Data For</FormLabel>
                  <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
                    <FormControlLabel value="match" control={<Radio color="primary" />} label="During Match Only" />
                    <FormControlLabel value="now" control={<Radio color="primary" />} label="All Tweets to Current Date" />
                  </RadioGroup>
                </FormControl>
                <div>
                  <FormControl>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      endIcon={<SendIcon />}
                    >
                      Generate
                    </Button>
                  </FormControl>
                </div>
              </form>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </>
  );
};

export default FixtureBar;
