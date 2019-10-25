import React, { useState, useCallback, useContext } from 'react';
import { googleMaps } from '../../services/search';
import { setLatLnt } from '../../services/gelocation';
import SearchInput from '../SearchInput/SearchInput';
import { HeaderPageContainer } from './styles';
import ModalAddress from '../ModalAddress';
import AppContext from '../../AppContext';

function HeaderPage() {
  const { value, updateState } = useContext(AppContext);
  const [openModal, setOpenModal] = useState(false);
  const [addressResults, setAddressResults] = useState([]);
  const [valueSearch, setValueSearch] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const saveAddress = useCallback(
    async address => {
      const {
        geometry: { location }
      } = address;

      setOpenModal(false);
      await setLatLnt(location);
      updateState('location', location);
    },
    [updateState]
  );

  const searchAddress = useCallback(async () => {
    setIsLoading(true);
    try {
      const results = await googleMaps(valueSearch);

      setAddressResults(results);

      if (results.length > 1) {
        setOpenModal(true);
      } else {
        saveAddress(results[0]);
      }
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  }, [saveAddress, valueSearch]);

  if (value && value.location) return null;

  return (
    <React.Fragment>
      <ModalAddress
        results={addressResults}
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSelected={address => saveAddress(address)}
      />

      <HeaderPageContainer>
        <SearchInput
          value={valueSearch}
          onChange={value => setValueSearch(value)}
          onSearch={() => searchAddress()}
          isLoading={isLoading}
        />
      </HeaderPageContainer>
    </React.Fragment>
  );
}

export default HeaderPage;
