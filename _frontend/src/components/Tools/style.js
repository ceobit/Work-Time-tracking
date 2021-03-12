import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  tools: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
  },
  tool: {
    padding: '0',
    margin: '0 2% 0 0',
    alignSelf: 'center',
    alignItems: 'end',
  },
  pickers: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '70%',
    paddingLeft: '2%',
  },
  button: {
    height: '50%',
  },
  rotate: {
    transform: 'rotate(180deg)',
    margin: '0',
    padding: '0',
  },
}));
