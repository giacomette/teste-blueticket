import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
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
