import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import ListAddress from '../ListAddress';

function ModalAddress({ open, onClose, onSelected, results }) {
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          Encontramos {results.length} resultados para sua busca. Clique para
          selecionar qual é o seu endereço =)
        </DialogTitle>
        <DialogContent>
          <ListAddress
            items={results}
            onSelected={address => onSelected(address)}
          />
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

export default ModalAddress;
