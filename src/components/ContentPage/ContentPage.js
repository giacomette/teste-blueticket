import React, { useContext, useEffect, useState } from 'react';
import { Button, Paper, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CardClima from '../CardClima';
import AppContext from '../../AppContext';
import { getCurrentWeather } from '../../services/search';
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

    loadWeathers();
  }, [value]);

  return (
    <React.Fragment>
      <WrapperHeader>
        <Container>
          <WrapperHeaderTitle>
            {currentWeather.name || ''} - {currentWeather.country || ''}
          </WrapperHeaderTitle>
          <WrapperHeaderTemp>{currentWeather.temp}ºC</WrapperHeaderTemp>

          <WrapperHeaderButton>
            <Button
              onClick={() => updateState({})}
              variant="contained"
              color="secondary"
            >
              <SearchIcon /> Refazer a Busca
            </Button>
          </WrapperHeaderButton>
        </Container>
      </WrapperHeader>

      <ModalPermission />
      {value.location ? (
        <div>
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper>
                  <CardClima data={currentWeather} isLoading={isLoading} />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper>xs=12 sm=6</Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper>xs=12 sm=6</Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper>xs=6 sm=3</Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper>xs=6 sm=3</Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper>xs=6 sm=3</Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper>xs=6 sm=3</Paper>
              </Grid>
            </Grid>
          </Container>
        </div>
      ) : null}
    </React.Fragment>
  );
}

export default ContentPage;
