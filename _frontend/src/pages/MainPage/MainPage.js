import React from 'react';

import {Bar} from '../../components/Bar/Bar';
import Timer from '../../components/Timer/Timer';
import {useStyles} from './style';
import {WorkTimeHistory} from '../../components/WorkTimeHistory/WorkTimeHistory';

export const MainPage = () => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Bar/>
      <Timer />
      <WorkTimeHistory />
    </div>
  );
};
