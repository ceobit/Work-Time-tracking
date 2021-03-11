import {makeStyles} from '@material-ui/core/styles';

export const useToolbarStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
  },
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.primary.light,
      },
  title: {
    flex: '1 1 100%',
  },
  totalTime: {
    justifyContent: 'right',
    width: '19%',
    fontSize: '14px',
  },
  chart: {
    position: 'absolute',
    left: '96%',
    top: '-140%',
  }
}));

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '50vw',
    margin: '25px auto',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  row: {
      backgroundColor: '#bbc3ea!important',
  },
  empty: {
    color:'#181934!important',
  },
  cell: {
    width: '300px',
    whiteSpace: 'normal!important',
    wordBreak: 'break-word!important'
  }
}));
