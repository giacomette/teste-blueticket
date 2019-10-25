import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ImageIcon from '@material-ui/icons/LocationCity';
import Button from '@material-ui/core/Button';

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
