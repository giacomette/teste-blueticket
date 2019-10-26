import axios from 'axios';
import {
  weatherUrl,
  weatherKey,
  googleMapsUrl,
  googleMapsKey
} from '../infra/config';
import { convertKelvinToCelsius } from './gelocation';

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
  const { data } = await axios.get(`${weatherUrl}/weather`, {
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
  const { data: results } = await axios.get(`${weatherUrl}/forecast`, {
    params: {
      lat,
      lon,
      appid: weatherKey
    }
  });

  return results.map(data => {
    const { main } = data;
    return {
      humidity: main.humidity,
      temp: convertKelvinToCelsius(main.temp),
      temp_max: convertKelvinToCelsius(main.temp_max),
      temp_min: convertKelvinToCelsius(main.temp_min),
      name: data.city.name,
      country: data.city.country
    };
  });
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
