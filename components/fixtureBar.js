/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Avatar, Accordion, Typography, AccordionDetails,
  Chip, AccordionSummary, Button, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio,
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
      <Typography variant="h5">
        Recent Fixtures
      </Typography>
      <div>
        {fixtures.map((fixture) => (
          <Accordion key={fixture._id}>
            <AccordionSummary expandIcon={<ExpandMore />} content={classes.fixtureBar}>
              <Chip label={fixture.status} variant="outlined" className={classes.chip} />
              <Typography variant="p" className={classes.team}>
                {fixture.teams.home.name}
                <Avatar src={fixture.teams.home.logo} className={classes.homeAvatar} />
              </Typography>
              <Typography>
                {fixture.goals.home}
                {' - '}
                {fixture.goals.away}
              </Typography>
              <Typography variant="p" className={classes.team}>
                <Avatar src={fixture.teams.away.logo} className={classes.awayAvatar} />
                {fixture.teams.away.name}
              </Typography>
              <Typography>
                {format(new Date(fixture.startDate), 'MMM dd, yyyy - HH:mm')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <form onSubmit={(e) => handleSubmit(e, fixture)}>
                <Typography>
                  Generate Graphs
                </Typography>
                <FormControl color="secondary">
                  <FormLabel color="secondary">Select team to analyse tweets for</FormLabel>
                  <RadioGroup value={team} onChange={(e) => setTeam(e.target.value)}>
                    <FormControlLabel value="both" control={<Radio color="secondary" />} label="Both" />
                    <FormControlLabel value="home" control={<Radio color="secondary" />} label={fixture.teams.home.name} />
                    <FormControlLabel value="away" control={<Radio color="secondary" />} label={fixture.teams.away.name} />
                  </RadioGroup>
                </FormControl>
                <hr />
                <FormControl color="secondary">
                  <FormLabel color="secondary">Select Timeframe to Analyse Data For</FormLabel>
                  <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
                    <FormControlLabel value="match" control={<Radio color="secondary" />} label="During Match Only" />
                    <FormControlLabel value="now" control={<Radio color="secondary" />} label="All Tweets to Current Date" />
                  </RadioGroup>
                </FormControl>
                <div>
                  <FormControl>
                    <Button
                      type="submit"
                      color="secondary"
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
