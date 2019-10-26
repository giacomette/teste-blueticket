import React from 'react';
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction
} from '@material-ui/core';
import { LocationCity as ImageIcon } from '@material-ui/icons';

function ListAddress({ items = [], onSelected }) {
  return (
    <React.Fragment>
      <List>
        {items.map((address, key) => (
          <ListItem key={key}>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={address.formatted_address} />

            <ListItemSecondaryAction>
              <Button
                onClick={() => onSelected(address)}
                size="small"
                variant="contained"
                color="primary"
              >
                Selecionar
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}

export default ListAddress;
