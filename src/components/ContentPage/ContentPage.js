import React, { useContext, useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardClima from '../CardClima';
import AppContext from '../../AppContext';
import { weather } from '../../services/search';
import ModalPermission from '../ModalPermission';

function ContentPage() {
  const { value } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [weathers, setWeathers] = useState(false);

  useEffect(() => {
    if (!value.location) return;

    const { location } = value;

    async function loadWeathers() {
      setIsLoading(true);

      try {
        const results = await weather({
          lat: location.lat,
          lon: location.lng
        });

        setWeathers(results);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    }

    loadWeathers();
  }, [value]);

  return (
    <React.Fragment>
      <ModalPermission />
      {value.location ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>
              <CardClima isLoading={isLoading} />
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
      ) : null}
    </React.Fragment>
  );
}

export default ContentPage;
