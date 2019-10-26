import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function ModalClimaDetails({ open, onClose, data }) {
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle></DialogTitle>
        <DialogContent></DialogContent>
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
