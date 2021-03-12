import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Typography } from '@material-ui/core';
import { v4 as uuid } from 'uuid';

import { useStyles } from './style';
import { WorkTimeRecords } from '../WorkTimeRecords/WorkTimeRecords';
import { recordActions } from '../../redux/actions';
import { splitArray } from '../../aux';

export const WorkTimeHistory = () => {
  const classes = useStyles();

  const records = useSelector((state) => state.fetched_records.records);
  const filter = useSelector((state) => state.filter.records);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(recordActions.getRecords());
  }, [dispatch]);

  if (!records.length) {
    return (
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            You don't have any records yet
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const recordArray = filter.length ? filter : records;

  return (
    <>
      {splitArray(recordArray).map((record) => (
        <WorkTimeRecords key={uuid()} records={record} />
      ))}
    </>
  );
};
