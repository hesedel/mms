import React from 'react';

import { Link } from 'react-router-dom';

import { IssuesIssue } from '../types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import IssueStateChip from './IssueStateChip';

interface IssuesListProps {
  issues: IssuesIssue[]
}

const IssuesList = ({ issues }:IssuesListProps) => {
  return (
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>State</TableCell>
          <TableCell>Title</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {issues.map(({ node }:IssuesIssue) => (
          <TableRow key={node.number} className="row">
            <TableCell component="th" scope="row">
              <IssueStateChip label={node.state}/>
            </TableCell>
            <TableCell>
              <Link to={`/issue/${node.number}`}>{node.title}</Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default IssuesList;
