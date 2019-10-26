import React from 'react';
import Typography from '@material-ui/core/Typography';
import Skeleton from 'react-loading-skeleton';

function CardClima({ isLoading, data }) {
  console.log('CARDCLIMA', data);
  return (
    <div>
      {isLoading && <Skeleton height={100} />}
      {!isLoading && (
        <div>
          <Typography variant="h4" component="h3">
            {data.name} - {data.country}
          </Typography>
          <Typography variant="h5" component="h3">
            {data.temp}ºc
          </Typography>
        </div>
      )}
    </div>
  );
}

export default CardClima;
