import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';
import { CardComponent } from '../CardClima/CardClima';
import { Grid } from '@material-ui/core';

function ModalClimaDetails({ open, onClose, data }) {
  const title = item => moment(item.data).format('HH:mm');

  return (
    <div>
      <Dialog maxWidth={'md'} open={open} onClose={onClose}>
        <DialogTitle>
          {moment(data.data).format('DD/MM/YYYY')} -
          {moment(data.data).format('dddd')}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {data &&
              data.all &&
              data.all.map(item => (
                <Grid item sm={3} xs={12}>
                  <CardComponent
                    title={title(item)}
                    temp_min={item.temp_min}
                    temp_max={item.temp_max}
                  />
                </Grid>
              ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalClimaDetails;
