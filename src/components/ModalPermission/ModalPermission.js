import React, { useContext, useEffect, useState, useCallback } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import AppContext from '../../AppContext';
import {
  requestPermissionLocation,
  checkPermissionLocation,
  setLatLnt
} from '../../services/gelocation';

function ModalPermission() {
  const { value, updateState } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function init() {
      if (!value.location) {
        const statusPermission = await checkPermissionLocation();

        if (statusPermission === 'prompt') {
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
      await setLatLnt(coords.latitude, coords.longitude);
      updateState('location', {
        lat: coords.latitude,
        lng: coords.longitude
      });
    } catch (e) {}
  }, [updateState]);

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
