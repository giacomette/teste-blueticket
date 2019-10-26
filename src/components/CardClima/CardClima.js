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

  const title = `${moment(data.data).format('DD/MM/YYYY')} - ${moment(
    data.data
  ).format('dddd')}`;

  return (
    <CardStyled>
      <ModalClimaDetails
        data={data}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />

      <CardComponent
        title={title}
        isLoading={isLoading}
        temp_min={data.temp_min}
        temp_max={data.temp_max}
        onClick={() => setOpenModal(true)}
      />
    </CardStyled>
  );
}

export function CardComponent({
  title,
  temp_min,
  temp_max,
  isLoading,
  onClick
}) {
  return (
    <Card onClick={onClick}>
      {isLoading && <Skeleton height={100} />}
      {!isLoading && (
        <CardContent>
          <Typography variant="h6" component="h3">
            {title}
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography>
                <IconMin>
                  <ArrowDownwardIcon />
                </IconMin>
                {temp_min}º mínima
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <IconMax>
                  <ArrowUpwardIcon />
                </IconMax>
                {temp_max}º máxima
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      )}
    </Card>
  );
}
export default CardClima;
