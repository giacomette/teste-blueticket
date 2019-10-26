import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import { Paper } from '@material-ui/core';

const options = {
  responsive: true,
  legend: {
    position: 'top'
  }
};

function ChartClima({ isLoading, data = {} }) {
  const { group } = data;

  const dataChart = {
    labels: group.map(item => moment(item.data).format('DD/MM')),
    datasets: [
      {
        type: 'line',
        label: 'Veloc. do Vento',
        fill: true,
        backgroundColor: '#30b9fd',
        borderColor: '#30b9fd',
        borderWidth: 1,
        data: group.map(item => item.wind_average)
      },
      {
        label: 'Temp. Mín.',
        backgroundColor: '#007dbb',
        borderColor: '#007dbb',
        borderWidth: 1,
        data: group.map(item => item.temp_min)
      },
      {
        label: 'Temp. Máx.',
        backgroundColor: '#d83333',
        borderColor: '#d83333',
        borderWidth: 1,
        data: group.map(item => item.temp_max)
      }
    ]
  };

  return (
    <Paper>
      {isLoading ? (
        <Skeleton height={50} count={4} />
      ) : (
        <Bar data={dataChart} options={options} />
      )}
    </Paper>
  );
}

export default ChartClima;
