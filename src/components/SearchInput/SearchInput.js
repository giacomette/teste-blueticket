import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SearchInputContainer, InputText } from './styles';

function SearchInput({ value, onChange, isLoading, onSearch }) {
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
      <IconButton
        disabled={isLoading}
        aria-label="search"
        onClick={() => onSearch(value)}
      >
        {isLoading ? <CircularProgress size={25} /> : <SearchIcon />}
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
