import ApolloClient, { gql } from 'apollo-boost';
import config from './config';

const client = new ApolloClient({
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${config.github.token}`,
      },
    });
  },
  uri: config.github.uri,
});

/**
 * Generates the query string to be used in the query search query field
 * @param filters
 */
const generateQueryString = (search:string, state:string):string => {
  const queryParams = ['is:issue', `repo:${config.github.owner}/${config.github.repo}`, 'sort:created-desc'];

  if (search) {
    queryParams.push(...[`in:title ${search}`, `in:body ${search}`]);
  }

  if (state) {
    queryParams.push(`state:${state}`);
  }

  return queryParams.join(' ');
}

const ISSUE_QUERY = gql`
  query Issue($number:Int!) {
    repository(name: "${config.github.repo}", owner: "${config.github.owner}") {
    issue(number: $number) {
      author {
        login
      }
      id
      state
      title
      bodyHTML
      comments(first: 10) {
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
    }
  }
  }
`;

const ISSUES_QUERY = gql`
  query Search($after:String, $before:String, $first:Int, $last:Int, $query:String!) {
    search(after: $after, before: $before, first: $first, last: $last, query: $query, type: ISSUE) {
      edges {
        node {
          ...on Issue {
            number
            state
            title
          }
        }
      }
      issueCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

interface QueryIssues {
  after: string | null
  before: string | null
  search: string
  state: string
}

const queryIssues = async ({ after, before, search, state }:QueryIssues) => {
  const first = after || !before ? 10 : null;
  const last = before ? 10 : null;
  const queryString = generateQueryString(search, state);

  const result = await client.query({
    fetchPolicy: 'cache-first',
    query: ISSUES_QUERY,
    variables: {
      after,
      before,
      first,
      last,
      query: queryString,
    },
  })
    .catch((e) => {
      console.log(e);
      return;
    });

  return result && result.data.search;
};

export { ISSUE_QUERY, queryIssues };
export default client;
