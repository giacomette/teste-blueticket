/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import 'moment/locale/pt-br';
import SearchPage from './components/SearchPage';
import { Body } from './styles';
import ContentPage from './components/ContentPage';
import AppContext from './AppContext';
import { getLatLnt } from './services/gelocation';

function App() {
  const [value, setValue] = useState({});

  useEffect(() => {
    function init() {
      const latLng = getLatLnt();

      if (latLng) {
        setValue({
          ...value,
          location: latLng
        });
      }
    }

    init();
  }, []);

  return (
    <AppContext.Provider
      value={{
        value,
        updateState: (prop, v) =>
          setValue({
            ...value,
            [prop]: v
          })
      }}
    >
      <Body>{!value.location ? <SearchPage /> : <ContentPage />}</Body>
    </AppContext.Provider>
  );
}

export default App;
