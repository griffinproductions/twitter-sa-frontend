/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { format } from 'date-fns';
import GraphPanel from '../components/graphPanel';
import FixtureBar from '../components/fixtureBar';

const useStyles = makeStyles(() => ({
  centralGrid: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'top',
  },
}));

export default function Home() {
  const classes = useStyles();
  const [tweets, setTweets] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [loaded, setLoaded] = useState('no');
  const [title, setTitle] = useState('');

  const getProcessedData = async (fixture, category, team) => {
    let startDate;
    let endDate;
    if (category === 'match') {
      const latestMatchDate = new Date(new Date(fixture.startDate).getTime() + (1000 * 60 * 150));
      const currentDate = new Date();
      // eslint-disable-next-line max-len
      startDate = latestMatchDate.getTime() > currentDate.getTime() ? null : latestMatchDate;
      endDate = new Date(fixture.startDate);
    } else {
      endDate = new Date(fixture.startDate);
    }
    const formattedStartDate = startDate ? format(startDate, 'yyyy-MM-dd HH:mm:ss') : '';
    const formattedEndDate = format(endDate, 'yyyy-MM-dd HH:mm:ss');
    let hashtag;
    if (team === 'home') {
      hashtag = fixture.teams.home.hashtag;
    } else if (team === 'away') {
      hashtag = fixture.teams.away.hashtag;
    } else {
      hashtag = fixture.hashtag;
    }
    setLoaded('loading');
    fetch(`http://localhost:81/tweets/process/all/?hashtag=${encodeURIComponent(hashtag)}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTweets(data);
        setLoaded('yes');
        setTitle(`Data for ${fixture.teams.home.name} vs ${fixture.teams.away.name} for ${team} during ${category}`);
      }).catch((err) => console.log(err));
  };

  const getFixtures = async () => {
    const res = await fetch('http://localhost:81/fixtures/get');
    const data = await res.json();
    setFixtures(data);
  };

  useEffect(() => {
    getFixtures();
  }, []);

  return (
    <Container style={{ marginTop: '32px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} className={classes.centralGrid}>
          <GraphPanel data={tweets} loaded={loaded} title={title} />
        </Grid>
        <Grid item xs={12} md={4} style={{ overflowY: 'scroll', maxHeight: 'calc(100vh - 80px)' }}>
          <FixtureBar fixtures={fixtures} getProcessedData={getProcessedData} />
        </Grid>
      </Grid>
    </Container>
  );
}
