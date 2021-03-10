import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {IconButton, Tooltip} from '@material-ui/core';
import {Search} from '@material-ui/icons';
import SortIcon from '@material-ui/icons/Sort';

import {useStyles} from './style';
import {DatePicker} from '../DatePicker/DatePicker';
import Button from '@material-ui/core/Button';
import {recordActions} from '../../redux/actions';

export const Tools = () => {

  const records = useSelector(state => state.fetched_records.records);
  const filter = useSelector(state => state.filter.records);
  const dispatch = useDispatch();
  const [showPicker, setShowPicker] = useState(false);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const handleFilterIcon = () => {
    setShowPicker(true);
  };

  const onChange = e => {
    const {id, value} = e.target;
    id === 'dateFrom' ? setDateFrom(value) : setDateTo(value);
  };

  const handleFilter = () => {
    setShowPicker(false);
    dispatch(recordActions.getFilterRecords(dateFrom, dateTo, records));
  };

  const handleResetFilter = () => {
    dispatch(recordActions.resetFilter());
  };

  const classes = useStyles();

  return (
    <div className={classes.tools}>
      {!showPicker
        ? <>
          <Tooltip title="Filter" className={classes.tool}>
            <IconButton aria-label="filter" onClick={handleFilterIcon}>
              <Search/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Sort" className={classes.tool}>
            <IconButton aria-label="sort">
              <SortIcon/>
            </IconButton>
          </Tooltip>
        </>
        :
        <div className={classes.pickers}>
          <DatePicker label="From" id='dateFrom' onChange={onChange}/>
          <DatePicker label="To" id='dateTo' onChange={onChange}/>
          <div className={classes.button}>
            <Button variant='outlined'
                    color='primary'
                    size='small'
                    onClick={handleFilter}>
              Ok
            </Button>
          </div>
        </div>
      }
      {filter.length ?
        <div className={classes.button}>
          <Button variant='outlined'
                  color='primary'
                  size='small'
                  onClick={handleResetFilter}>
            Reset filter
          </Button></div> : null}
    </div>
  );
};

