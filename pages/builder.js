/* eslint-disable react-hooks/exhaustive-deps */
import {
  useEffect, useState, useCallback, useContext,
} from 'react';
import {
  Grid, Typography, Container, TextField, InputLabel, Box,
  Checkbox, FormControlLabel, FormGroup, Button, Alert, AlertTitle,
  Collapse, IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { makeStyles } from '@mui/styles';
import { CopyBlock } from 'react-code-blocks';
// import { format } from 'date-fns';
// import { zonedTimeToUtc } from 'date-fns-tz';
import enGB from 'date-fns/locale/en-GB';
import AuthContext from '../stores/authContext';

const useStyles = makeStyles(() => ({
  field: {
    marginTop: '20px !important',
    marginBottom: '20px !important',
    display: 'block !important',
  },
  error: {
    position: 'fixed',
    bottom: '5%',
    width: '50%',
    left: '25%',
  },
}));

const Builder = () => {
  const classes = useStyles();
  const [query, setQuery] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [limit, setLimit] = useState(100);
  const [excludeSensitive, setExcludeSensitive] = useState(false);
  const [categories, setCategories] = useState([false, false, false, false, false]);
  const [jwt, setJwt] = useState('');
  const [errors, setErrors] = useState(null);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');
  const { user } = useContext(AuthContext);

  const handleInputChange = useCallback(() => {
    const queryString = query ? `hashtag=${encodeURIComponent(query)}` : '';
    const startDateString = startDate ? `&endDate=${startDate.toISOString()}` : '';
    const endDateString = endDate ? `&startDate=${endDate.toISOString()}` : '';
    const limitString = limit ? `&limit=${limit}` : '';
    const sensitiveString = excludeSensitive ? '&excludeSensitive=true' : '';
    let categoryString = categories.includes(true) ? '&categories=' : '';
    if (categories.includes(true)) {
      categories.forEach((category, index) => {
        if (category) {
          categoryString += `${index},`;
        }
      });
      categoryString = categoryString.slice(0, -1);
    }

    const newUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/tweets/search?${queryString}${endDateString}${startDateString}${limitString}${sensitiveString}${categoryString}`;
    setUrl(newUrl);
  });

  useEffect(() => {
    handleInputChange();
  }, [query, startDate, endDate, limit, excludeSensitive, categories, handleInputChange]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categories.includes(true)) {
      setErrors('You must select at least one dataset to search.');
      setOpen(true);
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/key`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setJwt(data.key);
        if (data.message) {
          setErrors(data.message);
          setOpen(true);
          console.log(data.message);
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <Container style={{ marginTop: '8px' }}>
      {user && (user?.permissions === 'admin' || user?.permissions === 'broadcaster') && (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4">
            Builder
          </Typography>
        </Grid>
        <Grid container item xs={12} md={4} style={{ paddingRight: '16px', borderRight: '1px solid #ddd' }}>
          <Grid container item xs={12}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <Typography variant="h5">
                Tweet Options
              </Typography>
              <Grid item xs={12} className={classes.field}>
                <InputLabel htmlFor="tweet-lookup">Tweet Lookup</InputLabel>
                <TextField
                  id="tweet-lookup"
                  variant="outlined"
                  fullWidth
                  placeholder="Enter hashtag"
                  required
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} className={classes.field}>
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={enGB}>
                  <InputLabel htmlFor="date-range" style={{ marginBottom: '16px' }}>Tweet Date Range</InputLabel>
                  <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="Start Date"
                      value={startDate}
                      onChange={(newValue) => {
                        setStartDate(newValue);
                      }}
                      variant="inline"
                      maxDateTime={endDate}
                    />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="End Date"
                      value={endDate}
                      onChange={(newValue) => {
                        setEndDate(newValue);
                      }}
                      minDateTime={startDate}
                    />
                  </Box>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} className={classes.field}>
                <InputLabel htmlFor="tweet-number">Tweets to pull</InputLabel>
                <TextField
                  id="tweet-number"
                  variant="outlined"
                  fullWidth
                  placeholder="Enter tweet limit e.g. 10000"
                  type="number"
                  InputProps={{
                    inputProps: {
                      max: 45000, min: 100,
                    },
                  }}
                  required
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} className={classes.field}>
                <FormControlLabel
                  control={
                      (
                        <Checkbox
                          id="exclude-sensitive"
                          color="primary"
                          checked={excludeSensitive}
                          onChange={() => {
                            setExcludeSensitive(!excludeSensitive);
                          }}
                        />
                        )
                      }
                  label="Exclude tweets marked as sensitive?"
                />
              </Grid>
              <Typography variant="h5">
                Data to return
              </Typography>
              <Grid item xs={12} className={classes.field}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      (
                        <Checkbox
                          id="include-labelled-tweets"
                          color="primary"
                          checked={categories[0]}
                          onChange={() => {
                            const newCategories = [...categories];
                            newCategories[0] = !newCategories[0];
                            setCategories(newCategories);
                          }}
                        />
                        )
                      }
                    label="Raw labelled tweet data"
                  />
                  <FormControlLabel
                    control={
                      (
                        <Checkbox
                          id="include-sentiment-percentages"
                          color="primary"
                          checked={categories[1]}
                          onChange={() => {
                            const newCategories = [...categories];
                            newCategories[1] = !newCategories[1];
                            setCategories(newCategories);
                          }}
                        />
                        )
                      }
                    label="Percentages of each sentiment"
                  />
                  <FormControlLabel
                    control={
                      (
                        <Checkbox
                          id="include-cumulative-word-sentiments"
                          color="primary"
                          checked={categories[2]}
                          onChange={() => {
                            const newCategories = [...categories];
                            newCategories[2] = !newCategories[2];
                            setCategories(newCategories);
                          }}
                        />
                        )
                      }
                    label="Cumulitive sentiment for each word"
                  />
                  <FormControlLabel
                    control={
                      (
                        <Checkbox
                          id="include-average-sentiment-per-minute"
                          color="primary"
                          checked={categories[3]}
                          onChange={() => {
                            const newCategories = [...categories];
                            newCategories[3] = !newCategories[3];
                            setCategories(newCategories);
                          }}
                        />
                        )
                      }
                    label="Average sentiment per minute"
                  />
                  <FormControlLabel
                    control={
                      (
                        <Checkbox
                          id="include-per-sentiment-per-minute"
                          color="primary"
                          checked={categories[4]}
                          onChange={() => {
                            const newCategories = [...categories];
                            newCategories[4] = !newCategories[4];
                            setCategories(newCategories);
                          }}
                        />
                        )
                      }
                    label="Counts of tweets for each sentiment per minute"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} className={classes.field}>
                <Button variant="contained" color="primary" type="submit">Generate JSON Web Token</Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={8} style={{ paddingLeft: '16px' }}>
          <Typography variant="h5">
            Output
          </Typography>
          <Grid item xs={12}>
            <InputLabel htmlFor="url-display">Url</InputLabel>
            <TextField id="url-display" variant="outlined" fullWidth disabled multiline rows={2} value={url} />
          </Grid>
          <Grid item xs={12}>
            <InputLabel htmlFor="jwt-display">Generated JSON Web Token</InputLabel>
            <TextField id="jwt-display" variant="outlined" fullWidth disabled multiline rows={3} value={jwt} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">
              Usage Examples
            </Typography>
            <CopyBlock
              text={'document.cookie = "jwt=YOUR_JWT_HERE";\n\n'
              + `fetch('${url}', {\n`
              + '\tmethod: \'GET\',\n'
              + '\tcredentials: \'include\',\n'
              + '\theaders: {\n'
              + '\tAccept: \'application/json\',\n'
              + '\t\'Content-Type\': \'application/json\',\n'
              + '\t},\n'
              + '}).then((response) => response.json())\n'
              + '.then((data) => {\n'
              + '\tconsole.log(data);\n'
              + '\t// process data\n'
              + '}).catch((err) => console.log(err))'}
              language="javascript"
              showLineNumbers={false}
              theme="dark"
            />
          </Grid>
        </Grid>
        {errors && (
          <Collapse in={open}>
            <Grid item xs={12} className={classes.error}>
              <Alert
                severity="error"
                action={(
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                )}
                sx={{ mb: 2 }}
              >
                <AlertTitle>Error</AlertTitle>
                {errors}
              </Alert>
            </Grid>
          </Collapse>
        )}
      </Grid>
      )}
      {(!user || (user?.permissions !== 'admin' && user?.permissions !== 'broadcaster')) && (
        <div>You are not permitted to view this resource</div>
      )}
    </Container>
  );
};

export default Builder;
