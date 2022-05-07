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

  const getProcessedData = async (fixture, category) => {
    let startDate;
    let endDate;
    if (category === 'match') {
      // eslint-disable-next-line max-len
      startDate = new Date(new Date(fixture.startDate).getTime() + (1000 * 60 * 150));
      endDate = new Date(fixture.startDate);
    } else {
      endDate = new Date(fixture.startDate);
    }
    const formattedStartDate = startDate ? format(startDate, 'yyyy-MM-dd HH:mm:ss') : '';
    const formattedEndDate = format(endDate, 'yyyy-MM-dd HH:mm:ss');
    const { hashtag } = fixture;
    setLoaded('loading');
    fetch(`http://localhost:81/tweets/process/all/?hashtag=${encodeURIComponent(hashtag)}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTweets(data);
        setLoaded('yes');
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
          <GraphPanel data={tweets} loaded={loaded} />
        </Grid>
        <Grid item xs={12} md={4} style={{ overflowY: 'scroll', maxHeight: 'calc(100vh - 80px)' }}>
          <FixtureBar fixtures={fixtures} getProcessedData={getProcessedData} />
        </Grid>
      </Grid>
    </Container>
  );
}
