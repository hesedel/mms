import React from 'react';
import './App.css';

import {
  Router,
  Route,
  Switch,
} from 'react-router-dom';
import history from './history';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import Filter from './components/Filter';
import Issue from './components/Issue';
import Issues from './components/Issues';

const useStyles = makeStyles((theme:Theme) =>
  createStyles({
    paper: {
      color: theme.palette.text.secondary,
      padding: theme.spacing(2),
      textAlign: 'center',
    },
    root: {
      flexGrow: 1,
    },
  }),
);

const App = () => {
  const classes = useStyles();
  const rootClass = ['root', classes.root].join(' ');

  return (
    <div className={rootClass}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Filter />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Router history={history}>
              <Switch>
                <Route path="/" exact>
                  <Issues />
                </Route>
                <Route path="/issue/:issueNumber">
                  <Issue />
                </Route>
              </Switch>
            </Router>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
