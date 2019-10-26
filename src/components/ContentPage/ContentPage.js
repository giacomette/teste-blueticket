import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Button, Paper, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Skeleton from 'react-loading-skeleton';
import CardClima from '../CardClima';
import AppContext from '../../AppContext';
import { getCurrentWeather, getForecast } from '../../services/search';
import { clearLatLnt } from '../../services/gelocation';
import ModalPermission from '../ModalPermission';
import {
  Container,
  WrapperHeader,
  WrapperHeaderTitle,
  WrapperHeaderTemp,
  WrapperHeaderButton
} from './styles';

function ContentPage() {
  const { value, updateState } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecastWeather, setForecastWeather] = useState([]);

  useEffect(() => {
    if (!value.location) return;

    const { location } = value;

    async function loadWeathers() {
      setIsLoading(true);

      try {
        const result = await getCurrentWeather({
          lat: location.lat,
          lon: location.lng
        });

        console.log('results', result);

        setCurrentWeather(result);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    }

    async function loadForecast() {
      setIsLoading(true);

      try {
        const result = await getForecast({
          lat: location.lat,
          lon: location.lng
        });

        console.log('results', result);

        setForecastWeather(result);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    }

    Promise.all([loadWeathers(), loadForecast()]);
  }, [value]);

  const clearStateLocation = useCallback(async () => {
    await clearLatLnt();
    updateState('location', null);
  }, [updateState]);

  return (
    <React.Fragment>
      <div>
        <WrapperHeader>
          <Container>
            <WrapperHeaderTitle>
              {currentWeather.name || ''} - {currentWeather.country || ''}
            </WrapperHeaderTitle>
            <WrapperHeaderTemp>{currentWeather.temp}ºC</WrapperHeaderTemp>

            <WrapperHeaderButton>
              <Button
                onClick={() => clearStateLocation()}
                variant="contained"
                color="secondary"
              >
                <SearchIcon /> Refazer a Busca
              </Button>
            </WrapperHeaderButton>
          </Container>
        </WrapperHeader>

        <ModalPermission />

        {isLoading && <Skeleton height={170} />}
        <Container>
          <Grid container spacing={3}>
            {forecastWeather.map((item, key) => (
              <Grid item key={key} xs={12}>
                <Paper>
                  <CardClima data={item} />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default ContentPage;
