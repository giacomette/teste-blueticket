import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Button, Grid } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { weatherSiteUrl } from '../../infra/config';
import { getCurrentWeather, getForecast } from '../../services/search';
import { clearLatLnt } from '../../services/gelocation';
import AppContext from '../../AppContext';
import CardClima from '../CardClima';
import ChartClima from '../ChartClima/ChartClima';
import {
  Container,
  WrapperHeader,
  WrapperHeaderTitle,
  WrapperHeaderTemp,
  WrapperHeaderTempImage,
  WrapperHeaderButton
} from './styles';

function ContentPage() {
  const { value, updateState } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecastWeather, setForecastWeather] = useState({
    list: [],
    group: [{}, {}, {}]
  });

  useEffect(() => {
    if (!value.location) return;

    const { location } = value;

    async function loadWeathers() {
      try {
        const result = await getCurrentWeather({
          lat: location.lat,
          lon: location.lng
        });

        setCurrentWeather(result);

        return result;
      } catch (e) {}
    }

    async function loadForecast(current) {
      try {
        const result = await getForecast({
          lat: location.lat,
          lon: location.lng
        });

        const first = result.group.splice(0, 1);

        setCurrentWeather({
          ...current,
          ...first[0]
        });
        setForecastWeather(result);
      } catch (e) {}
    }

    async function init() {
      setIsLoading(true);
      const current = await loadWeathers();
      await loadForecast(current);
      setIsLoading(false);
    }

    init();
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
              <h2>
                {value.location.name ? (
                  value.location.name
                ) : (
                  <span>
                    {value.location.name || currentWeather.name || '--'} ,{' '}
                    {currentWeather.country}
                  </span>
                )}
              </h2>
              <p>{currentWeather.humidity || '--'}% de humidade do ar</p>
            </WrapperHeaderTitle>
            <WrapperHeaderTemp>
              <h2>{currentWeather.temp}º</h2>
              <p>
                Mínima {currentWeather.temp_min || '--'}º / Máxima{' '}
                {currentWeather.temp_max || '--'}º
              </p>

              <WrapperHeaderTempImage>
                <img
                  alt="Tempo"
                  src={`${weatherSiteUrl}/themes/openweathermap/assets/vendor/owm/img/widgets/${currentWeather.weather &&
                    currentWeather.weather.icon}.png`}
                />
              </WrapperHeaderTempImage>
            </WrapperHeaderTemp>

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

        <Container>
          <Grid container spacing={3}>
            <Grid item sm={4} xs={12}>
              {forecastWeather.group.map((item, key) => (
                <CardClima key={key} isLoading={isLoading} data={item} />
              ))}
            </Grid>

            <Grid item sm={8} xs={12}>
              <ChartClima isLoading={isLoading} data={forecastWeather} />
            </Grid>
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default ContentPage;
