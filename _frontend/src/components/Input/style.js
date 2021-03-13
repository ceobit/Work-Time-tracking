import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25vw',
    },
  },
  [theme.breakpoints.down('sm')]: {
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
      },
    },
  },
}));
