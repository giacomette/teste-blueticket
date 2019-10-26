import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Skeleton from 'react-loading-skeleton';
import Card from '@material-ui/core/Card';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import { CardStyled, IconMin, IconMax } from './styles';
import ModalClimaDetails from '../ModalClimaDetails';

function CardClima({ isLoading, data }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <CardStyled>
      <ModalClimaDetails open={openModal} onClose={() => setOpenModal(false)} />
      <Card onClick={() => setOpenModal(true)}>
        {isLoading && <Skeleton height={100} />}
        {!isLoading && (
          <CardContent>
            <Typography variant="h6" component="h3">
              {moment(data.data).format('DD/MM/YYYY')} -{' '}
              {moment(data.data).format('dddd')}
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography>
                  <IconMin>
                    <ArrowDownwardIcon />
                  </IconMin>
                  {data.temp_min}º mínima
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  <IconMax>
                    <ArrowUpwardIcon />
                  </IconMax>
                  {data.temp_max}º máxima
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        )}
      </Card>
    </CardStyled>
  );
}

export default CardClima;
