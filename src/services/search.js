import axios from 'axios';
import {
  weatherUrl,
  weatherKey,
  googleMapsUrl,
  googleMapsKey
} from '../infra/config';

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

export async function weather({ lat, lon }) {
  const { data } = await axios.get(`${weatherUrl}/weather`, {
    params: {
      lat,
      lon,
      appid: weatherKey
    }
  });

  console.log('results', data);

  return data;
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
