import React from 'react';

import Chip from '@material-ui/core/Chip';

const IssueStateChip = (props:any) => {
  const { label } = props;
  const color = label.toLowerCase() === 'open' ? 'secondary' : 'default';

  return <Chip color={color} label={label} {...props}/>;
};

export default IssueStateChip;
