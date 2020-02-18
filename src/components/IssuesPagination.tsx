import React from 'react';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { PageInfo } from '../types';

interface IssuesPaginationProps {
  handleNext: any
  handlePrev: any
  pageInfo: PageInfo
}

const IssuesPagination = ({ handleNext, handlePrev, pageInfo }:IssuesPaginationProps) => {
  const { hasPreviousPage, hasNextPage } = pageInfo;

  const PrevButton = hasPreviousPage ? <Button onClick={handlePrev}>Prev</Button> : null;
  const NextButton = hasNextPage ? <Button onClick={handleNext}>Next</Button> : null;

  return (
    <ButtonGroup>
      {PrevButton}
      {NextButton}
    </ButtonGroup>
  );
};

export default IssuesPagination;
