import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  clock: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    flexWrap: 'wrap',
  },
  [theme.breakpoints.down('sm')]: {
    button: {
      width: '100%',
      margin: '2% 5%',
    },
  },
  [theme.breakpoints.down('md')]: {
    clock: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      flexWrap: 'wrap',
    },
    button: {
      width: '100%',
      margin: '2% 5%',
    },
  },
  error: {
    fontSize: '12px',
    color: theme.palette.text.secondary,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
}));
