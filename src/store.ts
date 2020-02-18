import { createStore } from 'redux';

import { ISSUE_STATES, STATE_ACTION_TYPES, State, StateAction } from './types';
import history from './history';

const initialState:State = {
  filters: {
    search: '',
    state: ISSUE_STATES.OPEN,
  },
  issuesAfterCursor: null,
  issuesBeforeCursor: null,

  _wasPopped: false,
};

function reducer (state:State = initialState, action:StateAction):State {
  const { data, type } = action;

  if (type === STATE_ACTION_TYPES.SET_ISSUES_AFTER_CURSOR) {
    return Object.assign({}, state, {
      issuesAfterCursor: data,
      issuesBeforeCursor: null,

      _wasPopped: false,
    });
  }

  if (type === STATE_ACTION_TYPES.SET_ISSUES_BEFORE_CURSOR) {
    return Object.assign({}, state, {
      issuesAfterCursor: null,
      issuesBeforeCursor: data,

      _wasPopped: false,
    });
  }

  if (type === STATE_ACTION_TYPES.SET_FILTERS) {
    return Object.assign({}, state, {
      filters: data,
      issuesAfterCursor: null,
      issuesBeforeCursor: null,

      _wasPopped: false,
    });
  }

  if (type === STATE_ACTION_TYPES.SET_STATE) {
    return Object.assign({}, state, data, {
      _wasPopped: true,
    });
  }

  return state;
}

let store = createStore(reducer);

export default store;

// @TODO - BELOW IS JUST FOR THE SAKE OF A BETTER WORKING PROTOTYPE

store.subscribe(() => {
  const state = store.getState();
  const { filters, issuesAfterCursor, issuesBeforeCursor, _wasPopped } = state;

  if (_wasPopped) {
    return;
  }

  history.push(`/?state=${filters.state}&search=${encodeURIComponent(filters.search)}&issuesAfterCursor=${issuesAfterCursor}&issuesBeforeCursor=${issuesBeforeCursor}`, state);
});

window.onpopstate = (e:PopStateEvent):any => {
  if (!e.state) {
    store.dispatch({
      type: STATE_ACTION_TYPES.SET_STATE,
      data: initialState,
    });

    return;
  }

  store.dispatch({
    type: STATE_ACTION_TYPES.SET_STATE,
    data: e.state.state,
  });
};
