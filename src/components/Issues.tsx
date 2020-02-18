import React from 'react';
import './Issues.css';

import { connect } from 'react-redux';

import { STATE_ACTION_TYPES, Filters, IssuesIssue, State } from '../types';
import { queryIssues } from '../client';
import store from '../store';

import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import IssuesList from './IssuesList';
import IssuesPagination from './IssuesPagination';

interface IssuesProps {
  dispatch: typeof store.dispatch
  filters: Filters
  issuesAfterCursor: string | null
  issuesBeforeCursor: string | null
}

interface IssuesState {
  error: boolean
  isLoading: boolean
  issueCount: number
  issues: IssuesIssue[]
  pageInfo: {
    endCursor: string
    hasNextPage: boolean
    hasPreviousPage: boolean
    startCursor: string
  }
}

class Issues extends React.Component<IssuesProps, IssuesState> {
  constructor (props:IssuesProps) {
    super(props);

    this.state = {
      error: false,
      isLoading: false,
      issueCount: 0,
      issues: [],
      pageInfo: {
        endCursor: '',
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: '',
      },
    };
  }

  render () {
    const { dispatch } = this.props;
    const { error, isLoading, issueCount, issues, pageInfo } = this.state;
    const issueCountLabel = `${issueCount} issues found`;

    if (error) {
      return <div>AN ERROR OCCURRED</div>;
    }

    const handleNext = () => {
      dispatch({
        type: STATE_ACTION_TYPES.SET_ISSUES_AFTER_CURSOR,
        data: pageInfo.startCursor,
      });
    };

    const handlePrev = () => {
      dispatch({
        type: STATE_ACTION_TYPES.SET_ISSUES_BEFORE_CURSOR,
        data: pageInfo.endCursor,
      });
    };

    return (
      <div className={'issues'}>
        <div>
          <Chip label={issueCountLabel}/>
        </div>

        <IssuesList issues={issues}/>

        <div className="pagination">
          <IssuesPagination handleNext={handleNext} handlePrev={handlePrev} pageInfo={pageInfo}/>
        </div>

        {isLoading ? (
          <div className="loading">
            <span className="progress">
              <CircularProgress color="secondary"/>
            </span>
          </div>
        ) : null}
      </div>
    );
  }

  // component lifecycle

  componentDidMount () {
    this.loadIssues();
  }

  componentDidUpdate (prevProps: Readonly<IssuesProps>, prevState: Readonly<IssuesState>, snapshot?: any) {
    // if props changed, load new data
    if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
      this.loadIssues();
    }
  }

  // methods

  async loadIssues () {
    const { filters, issuesAfterCursor, issuesBeforeCursor } = this.props;
    const { search, state } = filters;

    this.setState({
      isLoading: true,
    });

    const result = await queryIssues({
      after: issuesAfterCursor,
      before: issuesBeforeCursor,
      search,
      state,
    });

    if (!result) {
      this.setState({
        error: true,
        isLoading: false,
      });

      return;
    }

    const { issueCount, edges, pageInfo } = result;

    this.setState({
      isLoading: false,
      issueCount: issueCount,
      issues: edges || [],
      pageInfo: pageInfo,
    });
  }
}

function mapStateToProps(state:State) {
  const { filters, issuesAfterCursor, issuesBeforeCursor } = state;

  return { filters, issuesAfterCursor, issuesBeforeCursor };
}

export default connect(mapStateToProps)(Issues);
