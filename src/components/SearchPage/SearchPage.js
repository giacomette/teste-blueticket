import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Button, Snackbar } from '@material-ui/core';
import { LocationOnOutlined as LocationOnOutlinedIcon } from '@material-ui/icons';
import { googleMaps, saveHistory, getHistory } from '../../services/search';
import {
  setLatLnt,
  checkPermissionLocation,
  requestPermissionLocation
} from '../../services/gelocation';
import SearchInput from '../SearchInput/SearchInput';
import { HeaderPageContainer, ButtonLocation } from './styles';
import ModalAddress from '../ModalAddress';
import AppContext from '../../AppContext';
import ModalPermission from '../ModalPermission';

function SearchPage() {
  const { updateState } = useContext(AppContext);
  const [openModal, setOpenModal] = useState(false);
  const [openEmptyResult, setOpenEmptyResult] = useState(false);
  const [addressResults, setAddressResults] = useState([]);
  const [valueSearch, setValueSearch] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isLocationGrantedOrPrompt, setIsLocationGrantedOrPrompt] = useState(
    false
  );

  useEffect(() => {
    async function init() {
      const result = await checkPermissionLocation();

      setIsLocationGrantedOrPrompt(result !== 'denied');
    }

    init();
  }, []);

  const saveAddress = useCallback(
    async address => {
      const {
        geometry: { location },
        formatted_address
      } = address;

      setOpenModal(false);
      await setLatLnt(location.lat, location.lng, formatted_address);
      updateState('location', {
        ...location,
        name: formatted_address
      });
    },
    [updateState]
  );

  const searchAddress = useCallback(async () => {
    if (!valueSearch) return;

    setIsLoading(true);
    try {
      saveHistory(valueSearch);

      const results = await googleMaps(valueSearch);

      setAddressResults(results);

      if (results.length > 1) {
        setOpenModal(true);
      } else if (results.length === 1) {
        saveAddress(results[0]);
      } else {
        setOpenEmptyResult(true);
      }
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  }, [saveAddress, valueSearch]);

  const getCurrentLocation = useCallback(async () => {
    setIsLoading(true);

    try {
      const coords = await requestPermissionLocation();
      await setLatLnt(coords.latitude, coords.longitude);
      updateState('location', {
        lat: coords.latitude,
        lng: coords.longitude
      });
    } catch (e) {
      setIsLocationGrantedOrPrompt(false);
    }

    setIsLoading(false);
  }, [updateState]);

  const suggestions = getHistory();

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={openEmptyResult}
        autoHideDuration={2000}
        onClose={() => setOpenEmptyResult(false)}
        message={<span id="message-empty">Nenhum resultado encontrado!</span>}
      />

      <ModalAddress
        results={addressResults}
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSelected={address => saveAddress(address)}
      />

      <ModalPermission />

      <HeaderPageContainer>
        <SearchInput
          value={valueSearch}
          onChange={value => setValueSearch(value)}
          onSearch={() => searchAddress()}
          isLoading={isLoading}
          suggestions={suggestions}
        />
        {isLocationGrantedOrPrompt ? (
          <ButtonLocation>
            <Button
              disabled={isLoading}
              size="small"
              onClick={() => getCurrentLocation()}
            >
              <LocationOnOutlinedIcon />
              Usar minha localização
            </Button>
          </ButtonLocation>
        ) : null}
      </HeaderPageContainer>
    </React.Fragment>
  );
}

export default SearchPage;
