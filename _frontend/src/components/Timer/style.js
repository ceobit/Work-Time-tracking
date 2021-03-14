import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginTop: 15,
    width: '45vw',
    margin: '0 auto',
    padding: '0',
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 14,
  },
  clock: {
    alignSelf: 'center',
    padding: '0',
  },
  default: {
    padding: '0',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexWrap: 'nowrap',
      width: '100%',
    },
  },
}));
