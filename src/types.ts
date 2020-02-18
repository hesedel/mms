export enum ISSUE_STATES {
  BOTH = '',
  CLOSED = 'closed',
  OPEN = 'open',
}

export enum STATE_ACTION_TYPES {
  SET_ISSUES_AFTER_CURSOR = 'setIssuesAfterCursor',
  SET_ISSUES_BEFORE_CURSOR = 'setIssuesBeforeCursor',
  SET_FILTERS = 'setFilters',
  SET_STATE = 'setState',
}

export interface Filters {
  state: ISSUE_STATES
  search: string
}

export interface IssuesIssue {
  node: {
    number: number
    state: string
    title: string
  }
}

export interface Issues {
  edges: IssuesIssue[]
  issueCount: number
  pageInfo: PageInfo
}

export interface PageInfo {
  endCursor: string
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor: string
}

export interface State {
  filters: Filters
  issuesAfterCursor: string | null
  issuesBeforeCursor: string | null,

  _wasPopped: boolean,
}

export interface StateAction {
  type: STATE_ACTION_TYPES
  data: any
}
