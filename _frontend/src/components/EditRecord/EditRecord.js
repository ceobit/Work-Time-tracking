import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import {Modal} from '@material-ui/core';

import {getModalStyle, useStyles} from './style';
import Input from '../Input/Input';
import {recordActions} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';

export const EditRecord = ({recordId}) => {
  const classes = useStyles();

  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const description = useSelector(state => state.timer.description)

  const handleSave = () => {
    dispatch(recordActions.updateRecord(recordId, description)).
    then(() => dispatch(recordActions.getRecords()));
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper}>
        <Input label="Type a new description" name="newTask" />
        <Button variant="contained"
                color='primary'
                onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
};