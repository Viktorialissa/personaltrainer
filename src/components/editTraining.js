import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { API_trainings } from '../constants';


export default function EditTraining(props) {
  const [open, setOpen] = React.useState(false);
  const [training, setTraining] = React.useState({
    date: '',
    duration: '',
    activity:''

  });

  const handleClickOpen = () => {
    setOpen(true);
    console.log(props.data)
    setTraining({
        date: props.data.date,
        duration: props.data.duration,
        activity: props.data.activity
    })
  };


  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    console.log(training);
    props.editTraining(training, API_trainings + props.data.id)
    setOpen(false);
  }

  const changeDate = (e) => {
    console.log(e);
    setTraining({...training, date: e});
  };

  return (
    <div>
      <Button size='small' onClick={handleClickOpen}>
        Edit Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Training</DialogTitle>
        <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              margin="dense"
              label="Date&Time"
              inputFormat="dd/MM/yyyy HH:mm"
              value={training.date}
              onChange={changeDate}
              renderInput={(date) => <TextField {...date} />}/>
            </LocalizationProvider>
          <TextField
            margin="dense"
            label="Duration"
            value={training.duration}
            onChange={e => setTraining({...training, duration: e.target.value})}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Activity"
            value={training.activity}
            onChange={e => setTraining({...training, activity: e.target.value})}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
