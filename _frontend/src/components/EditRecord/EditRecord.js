import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from '@material-ui/core';

import { getModalStyle, useStyles } from './style';
import Input from '../Input/Input';
import { recordActions } from '../../redux/actions';

export const EditRecord = ({ recordId, handleClose, setIsEdit }) => {
  const classes = useStyles();

  const [modalStyle] = useState(getModalStyle);

  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const description = useSelector((state) => state.timer.description);

  const handleSave = () => {
    dispatch(recordActions.updateRecord(recordId, description))
      .then(() => dispatch(recordActions.getRecords()));
    setIsEdit(false);
  };

  return (
    <Modal
      open
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper}>
        <Input
          label="Type a new description"
          name="newTask"
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
};
