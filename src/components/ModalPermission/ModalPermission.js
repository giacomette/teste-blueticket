import React, { useContext, useEffect, useState, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppContext from '../../AppContext';
import {
  requestPermissionLocation,
  checkPermissionLocation
} from '../../services/gelocation';

function ModalPermission() {
  const { value, updateState } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function init() {
      if (!value.location) {
        const statusPermission = await checkPermissionLocation();

        if (statusPermission !== 'denied' && statusPermission !== 'granted') {
          setOpen(true);
        }
      }
    }

    init();
  }, [value.location]);

  const requestPermission = useCallback(async () => {
    try {
      setOpen(false);
      const coords = await requestPermissionLocation();
 
      updateState('location', {
        lat: coords.latitude,
        lng: coords.longitude
      });
    } catch (e) {}
  }, [updateState]);

  console.log('open', open);

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Localização</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Olá, deseja usar sua localização atual para ver os dados de clima ?
            Caso sim, clique em aceitar para disponibilizar sua localização.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen()}>Fechar</Button>
          <Button
            onClick={() => requestPermission()}
            variant="contained"
            color="primary"
          >
            Aceitar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalPermission;
