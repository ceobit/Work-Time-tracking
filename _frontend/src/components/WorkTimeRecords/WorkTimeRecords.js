import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { Create, Delete } from '@material-ui/icons';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import moment from 'moment';
import {
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';

import { useStyles, useToolbarStyles } from './style';
import { dateToString, getSeconds, getTotalTime } from '../../aux';
import { recordActions } from '../../redux/actions';
import { EditRecord } from '../EditRecord/EditRecord';
import { Chart } from '../Chart/Chart';

function createData(id, description, timeInterval, duration) {
  return {
    id,
    description,
    timeInterval,
    duration,
  };
}

const createRows = (records = []) => Array.from(
  records.map((item) => createData(
    item._id,
    item.description,
    `${moment(item.timeStart).format('hh:mm')} ~ ${moment(
      item.timeFinish,
    ).format('hh:mm')}`,
    item.duration,
  )),
);

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: '№',
    hidden: true,
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'timeInterval',
    numeric: false,
    disablePadding: false,
    label: 'Time Interval',
  },
  {
    id: 'duration',
    numeric: false,
    disablePadding: false,
    label: 'Duration',
  },
];

function EnhancedTableHead(props) {
  const {
    classes, order, orderBy, onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" />
        {headCells.map((headCell) => (!headCell.hidden ? (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc'
                    ? 'sorted descending'
                    : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ) : null))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const {
    recordId, date, totalTime, handleSelection, chartData,
  } = props;

  const [numSelected, setNumSelected] = useState(props.numSelected);
  const [isEdit, setIsEdit] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setNumSelected(props.numSelected);
  }, [props.numSelected]);

  // open a Modal window
  const handleEditRecord = () => {
    setIsEdit(!isEdit);
  };

  const handleCloseModal = () => {
    setIsEdit(false);
    handleSelection(recordId);
  };

  const handleDeleteRecord = () => {
    dispatch(recordActions.deleteRecord(recordId)).then(() => dispatch(recordActions.getRecords()));
    // .then(() => setNumSelected(0));
  };

  // show/hide chart
  const handleChart = () => {
    setShowChart(!showChart);
  };

  return (
    <div className={classes.container}>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected}
            {' '}
            selected
          </Typography>
        ) : (
          <>
            <Typography
              className={classes.title}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              {date ? dateToString(date) : ''}
            </Typography>
            <Tooltip title="Chart">
              <IconButton aria-label="chart" onClick={handleChart}>
                <DonutLargeIcon />
              </IconButton>
            </Tooltip>
          </>
        )}

        {numSelected > 0 ? (
          <>
            <Tooltip title="Edit">
              <IconButton aria-label="edit" onClick={handleEditRecord}>
                <Create />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton aria-label="delete" onClick={handleDeleteRecord}>
                <Delete />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <Typography
            className={classes.totalTime}
            variant="subtitle1"
            component="div"
          >
            Total:
            {' '}
            {totalTime}
          </Typography>
        )}
        {isEdit && (
          <EditRecord
            recordId={recordId}
            handleClose={handleCloseModal}
            setIsEdit={setIsEdit}
          />
        )}
      </Toolbar>
      {showChart && (
        <div className={classes.chart}>
          <Chart data={chartData} />
        </div>
      )}
    </div>
  );
};

export const WorkTimeRecords = ({ records }) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('date');
  const [selected, setSelected] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const rows = createRows(records);

  const totalTime = getTotalTime(rows);

  const chartData = rows.map((el) => ({
    name: el.description,
    value: getSeconds(el.duration),
  }));

  const handleClick = (event, name) => {
    selected === name ? setSelected(0) : setSelected(name);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected === name;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected ? 1 : 0}
          date={records[0].created_at}
          recordId={selected}
          totalTime={totalTime}
          handleSelection={handleClick}
          chartData={chartData}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected ? 1 : 0}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      className={isItemSelected ? classes.row : ''}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          className={classes.empty}
                        />
                      </TableCell>
                      <TableCell align="left" className={classes.cell}>
                        {row.description}
                      </TableCell>
                      <TableCell align="left">{row.timeInterval}</TableCell>
                      <TableCell align="left">{row.duration}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};
