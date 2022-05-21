/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { format } from 'date-fns';
import GraphPanel from '../components/graphPanel';
import FixtureBar from '../components/fixtureBar';

const useStyles = makeStyles(() => ({
  centralGrid: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'flex-start',
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
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tweets/process/all/?hashtag=${encodeURIComponent(hashtag)}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`)
      .then((response) => response.json())
      .then((data) => {
        setTweets(data);
        setLoaded('yes');
        setTitle(`Data for ${fixture.teams.home.name} vs ${fixture.teams.away.name} for ${team} during ${category}`);
      }).catch((err) => err);
  };

  const getFixtures = async () => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/fixtures/get`)
      .then((response) => response.json())
      .then((data) => {
        setFixtures(data);
      }).catch((err) => err);
  };

  useEffect(() => {
    getFixtures();
  }, []);

  return (
    <Container style={{ marginTop: '16px' }}>
      <Grid container spacing={3}>
        <Grid container item xs={12} lg={6} xl={8} spacing={1} className={classes.centralGrid}>
          <Grid item xs={12}>
            <Typography variant="h5" component="h6" style={{ marginLeft: '16px' }}>
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <GraphPanel data={tweets} loaded={loaded} title={title} isFavorite={false} initial />
          </Grid>
        </Grid>
        <Grid item xs={12} lg={6} xl={4}>
          <FixtureBar fixtures={fixtures} getProcessedData={getProcessedData} />
        </Grid>
      </Grid>
    </Container>
  );
}
