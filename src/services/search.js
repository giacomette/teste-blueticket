import axios from 'axios';
import {
  weatherUrl,
  weatherKey,
  googleMapsUrl,
  googleMapsKey
} from '../infra/config';
import { convertKelvinToCelsius } from './gelocation';
import moment from 'moment';

export async function googleMaps(valueSearch) {
  const { data } = await axios.get(`${googleMapsUrl}/json`, {
    params: {
      address: valueSearch,
      key: googleMapsKey
    }
  });

  const { results } = data;

  return results;
}

export async function getCurrentWeather({ lat, lon }) {
  const { data } = await axios.get(`${weatherUrl}/data/2.5/weather`, {
    params: {
      lat,
      lon,
      appid: weatherKey
    }
  });

  const { main } = data;

  return {
    humidity: main.humidity,
    temp: convertKelvinToCelsius(main.temp),
    temp_max: convertKelvinToCelsius(main.temp_max),
    temp_min: convertKelvinToCelsius(main.temp_min),
    name: data.name,
    country: data.sys.country
  };
}

export async function getForecast({ lat, lon }) {
  const { data: result } = await axios.get(`${weatherUrl}/data/2.5/forecast`, {
    params: {
      lat,
      lon,
      appid: weatherKey
    }
  });

  const resultMap = { group: [], list: [] };

  const groups = {};
  const list = [];

  for (const data of result.list) {
    const { main } = data;

    const item = {
      humidity: main.humidity,
      temp: convertKelvinToCelsius(main.temp),
      temp_max: convertKelvinToCelsius(main.temp_max),
      temp_min: convertKelvinToCelsius(main.temp_min),
      name: result.city.name,
      country: result.city.country,
      data: data.dt_txt,
      wind: data.wind,
      weather: data.weather[0]
    };

    list.push(item);

    const dateFormat = moment(item.data).format('YYYY-MM-DD');
    groups[dateFormat] = groups[dateFormat] || [];
    groups[dateFormat].push(item);
  }

  resultMap.list = list;

  for (const key of Object.keys(groups)) {
    const group = groups[key];

    const max = [...group].sort((a, b) =>
      a.temp_max > b.temp_max ? -1 : 1
    )[0];

    const min = [...group].sort((a, b) =>
      a.temp_min > b.temp_min ? 1 : -1
    )[0];

    const wind_average =
      group.reduce((agg, current) => current.wind.speed + agg, 0) /
      group.length;

    resultMap.group.push({
      temp_min: min.temp_min,
      temp_max: max.temp_max,
      wind_average: Number(wind_average.toFixed(2)),
      data: key,
      weather: group[0].weather,
      all: group
    });
  }

  return resultMap;
}

export function saveHistory(search) {
  const results = getHistory();

  const exists = results.find(s => s === search);

  if (!exists) {
    results.push(search);
    localStorage.setItem('searches', JSON.stringify(results));
  }
}

export function getHistory() {
  let results = [];

  try {
    results = JSON.parse(localStorage.getItem('searches'));
  } catch (e) {}

  return results;
}
