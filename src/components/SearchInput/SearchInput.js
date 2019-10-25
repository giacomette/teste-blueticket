import React from 'react';
import PropTypes from 'prop-types';
import { SearchInputContainer, InputText } from './styles';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

function SearchInput({ value, onChange, onSearch }) {
  return (
    <SearchInputContainer>
      <InputText
        variant="outlined"
        value={value}
        fullWidth
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => e.keyCode === 13 && onSearch(value)}
        placeholder="Faça sua busca"
      />
      <IconButton aria-label="search" onClick={() => onSearch(value)}>
        <SearchIcon />
      </IconButton>
    </SearchInputContainer>
  );
}

SearchInput.prototype = {
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
  value: PropTypes.any.isRequired
};

export default SearchInput;
