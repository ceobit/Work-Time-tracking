import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #fff',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 3, 2),
  },
  button: {
    alignSelf: 'flex-end',
    marginRight: '5%'
  }
}));


export const getModalStyle = () => {

  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}