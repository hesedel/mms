import React, { useRef, useState } from 'react';

import { connect } from 'react-redux';

import { ISSUE_STATES, STATE_ACTION_TYPES, Filters, State } from '../types';
import store from '../store';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

interface FilterProps {
  dispatch: typeof store.dispatch
  filters: Filters
}

const useStyles = makeStyles((theme:Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const Filter = ({ dispatch, filters }:FilterProps) => {
  const inputLabelRef = useRef<HTMLLabelElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const textFieldRef = useRef<HTMLDivElement>(null);

  const classes = useStyles();
  const [ labelWidth, setLabelWidth ] = useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabelRef.current!.offsetWidth);
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = textFieldRef.current!.querySelector('input')!.value

    dispatch({
      type: STATE_ACTION_TYPES.SET_FILTERS,
      data: {
        state: event.target.value,
        search: value
      }
    })
  };

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault()

    const searchValue = textFieldRef.current!.querySelector('input')!.value
    const stateValue = selectRef.current!.querySelector('input')!.value

    dispatch({
      type: STATE_ACTION_TYPES.SET_FILTERS,
      data: {
        search: searchValue,
        state: stateValue,
      }
    })
  };

  return (
    <form className={classes.root} autoComplete="off" noValidate onSubmit={handleSubmit}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabelRef} id="demo-simple-select-outlined-label">Filter State</InputLabel>

        <Select
          ref={selectRef}
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={filters.state}
          labelWidth={labelWidth}
          onChange={handleSelectChange}
        >
          {Object.entries(ISSUE_STATES).map(([key, value]) => (
            <MenuItem key={key} value={value}>{key}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField ref={textFieldRef} id="filled-basic" label="Search" variant="outlined"/>
    </form>
  )
}

function mapStateToProps(state: State) {
  const { filters } = state

  return { filters }
}

export default connect(mapStateToProps)(Filter)