import React, {useEffect} from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux';

import {Bar} from '../../components/Bar/Bar';
import Timer from '../../components/Timer/Timer';
import {useStyles} from './style';
import {WorkTimeHistory} from '../../components/WorkTimeHistory/WorkTimeHistory';
import {recordActions} from '../../redux/actions';


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
