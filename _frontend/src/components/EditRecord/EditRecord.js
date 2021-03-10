import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import {Modal} from '@material-ui/core';

import {getModalStyle, useStyles} from './style';
import Input from '../Input/Input';

export const EditRecord = ({label, name}) => {
  const classes = useStyles();

  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(true);

  const handleSave = e => {
    const {value} = e.target;
    // dispatch(timerActions.createDescription(value));
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
        <Input label="Type a new description" name="newTask"/>
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