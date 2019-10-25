import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

export const SearchInputContainer = styled.div`
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 60px;
  position: relative;

  .MuiButtonBase-root {
    position: absolute;
    right: 4px;
    top: 4px;
  }

  .MuiInputBase-input {
    border-radius: 10px;
  }
`;

export const InputText = styled(TextField)`
  background: #ffffff;
  border-radius: 30px;
  input {
    padding-right: 55px;
  }

  fieldset {
    border-radius: 30px;
    border-color: #ccc;
  }
`;
