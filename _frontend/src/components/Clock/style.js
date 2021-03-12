import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  clock: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
  },
  error: {
    fontSize: '12px',
    color: theme.palette.text.secondary,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  }
}));
