import React from 'react';
import './Issue.css';

import { ISSUE_QUERY } from '../client';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import CircularProgress from '@material-ui/core/CircularProgress';
import IssueStateChip from './IssueStateChip';

const Issue = () => {
  const { issueNumber = '' } = useParams();
  const number = parseInt(issueNumber, 10);

  const { loading, error, data } = useQuery(ISSUE_QUERY, {
    variables: {
      number,
    },
  });

  if (loading) return <CircularProgress color="secondary"/>;
  if (error) return <div>{error.message}</div>;

  const { issue } = data.repository;

  return (
    <article className="issue">
      <header className="header">
        <h1 className="title">{issue.title}</h1>
        <IssueStateChip label={issue.state}/>
        <h2 className="number">#{issueNumber}</h2>
        <h3 className="author">by {issue.author.login}</h3>
      </header>

     <div className="body" dangerouslySetInnerHTML={{ __html: issue.bodyHTML }}></div>
   </article>
  );
};

export default Issue;
